"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./product.min.css";
import FestProduct from "./FestProduct";
import BestSeller from "./BestSeller";
import NewProducts from "./NewProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { fetchCategory } from "../store/slices/categorySlice";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const ProductCard = () => {
  const dispatch = useDispatch();
  const { data: productData } = useSelector((state) => state.product);
  const { data: categoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategory());
  }, [dispatch]);

  const products = productData
    ?.filter((prod) => {
      if (prod.status !== "active" || prod.delete_status !== "active")
        return false;
      const category = categoryData.find(
        (cat) => String(cat._id) === String(prod.category_id)
      );
      if (!category) return false;
      const parentCategory = categoryData.find(
        (cat) => String(cat._id) === String(category.parent_category_id)
      );
      return !!parentCategory;
    })
    ?.map((prod) => {
      const category = categoryData.find(
        (cat) => String(cat._id) === String(prod.category_id)
      );
      const parentCategory = categoryData.find(
        (cat) => String(cat._id) === String(category.parent_category_id)
      );
      const images = [
        prod.image_name_1,
        prod.image_name_2,
        prod.image_name_3,
        prod.image_name_4,
      ];
      return {
        ...prod,
        categoryName: category.category_name,
        categoryUrl: category.page_url,
        parentCategoryUrl: parentCategory.page_url,
        images,
        fullUrl: `/${parentCategory.page_url}/${category.page_url}/${prod.page_url}`,
      };
    });

  const cardsData = categoryData
    .filter(
      (cat) =>
        cat.status === "active" &&
        cat.parent_category_id != 0 &&
        cat.sort_order <= 4 &&
        cat.delete_status === "active"
    )
    .map((cat) => {
      const parentCategory = categoryData.find(
        (parent) => String(parent._id) === String(cat.parent_category_id)
      );
      return {
        ...cat,
        parentUrl: parentCategory ? parentCategory.page_url : null,
        fullUrl: parentCategory
          ? `/${parentCategory.page_url}/${cat.page_url}`
          : `/${cat.page_url}`, // agar parent na ho toh sirf child
      };
    });
  return (
    <>
      <div className="bg-white rounded-2xl p-tb-60">
        <h2 className="text-xl">Featured Products</h2>
        <Slider {...settings} className="">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="p-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={product.fullUrl}>
                <div className="rounded-lg hover:shadow-2xl product p-2">
                  <span className="text-black">{product.categoryName}</span>
                  <h3
                    className="fs-6 font-bold hover:text-red-950 transition"
                    style={{ color: "var(--base-color) !important" }}
                  >
                    {product.product_name}
                  </h3>
                  <ul className="flex items-center mt-1">
                    {Array.from({ length: product.rating }, (_, i) => (
                      <li key={i} className="text-yellow-500">
                        <CiStar size={24} />
                      </li>
                    ))}
                  </ul>
                  <div className="image mt-3">
                    <img
                      src={product.image_name_1}
                      alt={product.product_name}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Slider>
      </div>
      <div>
        <FestProduct cards={cardsData} />
      </div>
      <div className="mb-3">
        <BestSeller products={products} />
      </div>
      <div className="mb-3">
        <NewProducts />
      </div>
    </>
  );
};

export default ProductCard;
