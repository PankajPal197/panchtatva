"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import Image from "next/image";
import Layout from "../../components/Layout";
import Breadcumbs from "../../components/breadcumbs/Breadcumbs";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../store/slices/productSlice";
import { fetchCategory } from "../../store/slices/categorySlice";
import { fetchImage } from "../../store/slices/imageSlice";

const page = () => {
  const { innerCatUrl } = useParams();
  const dispatch = useDispatch();
  const { data: product, loading } = useSelector((state) => state.product);
  const { data: category } = useSelector((state) => state.category);
  const { data: image } = useSelector((state) => state.image);
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategory());
    dispatch(fetchImage());
  }, [dispatch]);
  // if (loading) return <div className="p-10 text-blue-500">Loading...</div>;

  const catData = category.find((cat) => cat.page_url === innerCatUrl);
const parentCategoryData = category.find(
  (cat) => String(cat._id) === String(catData?.parent_category_id)
);

  if (!catData) {
    return <div className="p-10 text-red-600">Category not found</div>;
  }
  const brand = product.filter(
    (prod) => String(prod.category_id) === String(catData._id)
  );

const allImagesForCategories = [];

brand.forEach((b) => {
  const imagesForCategory = image.filter(
    (img) => String(img.product_id) === String(b.product_id)
  );
  allImagesForCategories.push({
    product: b,
    images: imagesForCategory,
  });
});

console.log(parentCategoryData);
  return (
    <Layout>
      <Breadcumbs
        title={catData.category_name}
        subCategory={parentCategoryData.category_name}
        pageUrl={catData.category_name}
      />
      <section className="mt-3 mb-3 category">
        <div className="p-tb-60">
          <div className="row">
            <div className="col-md-3">
              <div className="position-sticky top-0 z-index-1">
                <div className="card shadow-2xl rounded-2xl p-2">
                  <div className="bg-amber-900  p-2">
                    <span className="text-white text-center">
                      Category Title Name
                    </span>
                  </div>
                  <ul>
                    <li>Rudhraksha Beads</li>
                    <li>Maland Rosaries</li>
                    <li>Gem Stones</li>
                    <li>Vastu Store</li>
                  </ul>
                  <div className="bg-amber-900  p-2">
                    <span className="text-white text-center">Availability</span>
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" /> In Stock
                    </li>
                    <li>
                      <input type="checkbox" /> Out of Stock
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-900  p-2">
                  <span className="text-white text-center">Color</span>
                </div>
                <ul>
                  <li>Red</li>
                  <li>Blue</li>
                  <li>Yellow</li>
                  <li>Green</li>
                  <li>Pink</li>
                </ul>
                <div className="card shadow-2xl rounded-2xl">
                  <div className="bg-amber-950 p-2">
                    <span className="text-white text-center">Price</span>
                  </div>
                  <div className="border-b-1 p-3">No Filter Applied</div>
                  <div className="flex items-center justify-between p-3">
                    <div className="font-bold">Price</div>
                    <div className="font-medium">-</div>
                  </div>
                  <div className="row p-3">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="100"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="200"
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="button" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 category-item">
              <div className="row">
                {brand.length === 0 ? (
                  <div className="p-10 text-red-600">Category not found</div>
                ) : (
                  brand.map((item) => (
                    
                    <div className="col-md-4 mt-3" key={item.id}>
                      <div className="card p-3">
                        <Link href={`/${parentCategoryData.page_url}/${catData.page_url}/${item.page_url}`}>
                          <span className="text-xs text-gray-500">
                            {item.brand}
                          </span>

                          <h3 className="text-lg font-bold">{item.product_name}</h3>

                          <ul className="flex items-center">
                            {[...Array(item.rating)].map((_, i) => (
                              <li key={i} className="text-yellow-500">
                                <CiStar size={24} />
                              </li>
                            ))}
                          </ul>

                          <div className="image mt-2">
                              <Image
                              //  key={img._id}
                                src={item.image_name_1}
                                alt={item.image_title}
                                className="w-full h-60 object-cover rounded-lg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                              />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
