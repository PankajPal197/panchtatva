import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { fetchCategory } from "../store/slices/categorySlice";
import Link from "next/link";

const NewProducts = () => {
  const dispatch = useDispatch();
  const { data: productData } = useSelector((state) => state.product);
  const { data: categoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategory());
  }, [dispatch]);

  const products = productData
  ?.filter((prod) => {
    if (prod.status !== "active" || prod.delete_status !== "active") return false;
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="p-tb-60 pt-3">
      <div className="title mb-3">
        <h2 className="text-2xl font-bold ">Latest Products</h2>
      </div>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item.id}>
            <Link href={item.fullUrl} className="no-underline">
              <div className="h-34 w-34  mb-2 transition-all duration-300">
                <div className="image overflow-hidden rounded-full">
                  <img
                    src={item.image_name_1}
                    alt={item.product_name}
                    className="rounded-full w-32 h-32 object-cover transform hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div className="product-name mt-2 ml-6 font-semibold text-lg text-black">
                  {item.product_name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewProducts;
