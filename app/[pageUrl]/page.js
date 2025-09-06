"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import Image from "next/image";
import BannerSection from "../components/BannerSection";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/slices/categorySlice";

// const cat = [
//   {
//     id: 1,
//     brand: "Trendyzone",
//     name: "Lesh Sensation Wash",
//     image: "/slider/slider1.jpg",
//     catregoryUrl: "natural-1-mukhi-rudhraksh",
//     productUrl: "lesh-sensation-wash",
//     color: "red",
//     rating: 5,
//   },
//   {
//     id: 2,
//     brand: "Trendyzone",
//     name: "Aromatic Body Wash",
//     image: "/slider/slider1.jpg",
//     catregoryUrl: "natural-1-mukhi-rudhraksh",
//     productUrl: "aromatic-body-wash",
//     color: "green",
//     rating: 4,
//   },
//   {
//     id: 3,
//     brand: "Trendyzone",
//     name: "Luxury Face Cream",
//     image: "/slider/slider1.jpg",
//     catregoryUrl: "rudhrakhs-mala",
//     productUrl: "luxury-face-cream",
//     color: "yellow",
//     rating: 5,
//   },
//   {
//     id: 4,
//     brand: "Trendyzone",
//     name: "Organic Hair Oil",
//     image: "/slider/slider1.jpg",
//     productUrl: "/product/product",
//     color: "pink",
//     rating: 4,
//   },
//   {
//     id: 5,
//     brand: "Trendyzone",
//     name: "Glow Night Serum",
//     image: "/slider/slider1.jpg",
//     productUrl: "/product/product",
//     color: "red",
//     rating: 5,
//   },
//   {
//     id: 6,
//     brand: "test",
//     name: "Glow Night Serum",
//     image: "/slider/slider1.jpg",
//     productUrl: "/product/product",
//     rating: 5,
//     color: "green",
//   },
// ];
const Page = () => {
  const { pageUrl } = useParams();
  const dispatch = useDispatch();
  const { data: category, loading } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  // if (loading) return <div className="p-10 text-blue-500">Loading...</div>;

  const catData = category.find((cate) => cate.page_url === pageUrl);
  const cat = category.filter(
    (cate) => cate.parent_category_id === catData._id
  );
  console.log(cat);

  return (
    <Layout>
      <Breadcumbs title={catData?.category_name} pageUrl={catData?.page_url} />
      <BannerSection />

      <div className="p-tb-60 mt-3 category">
        <h1 className="title">{catData?.category_name}</h1>

        <div className="row">
          {!cat || cat.length === 0 ? (
            <div className="p-3 text-center text-red-600 bg-amber-50 w-100 text-2xl">
              {loading ? "Loading..." : "No Data found"}
            </div>
          ) : (
            cat.map((item) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"
                key={item._id}
              >
                <div
                  className="card shadow rounded item-menu p-3"
                  style={{
                    backgroundImage: `url(${item.image_name_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "350px",
                  }}
                >
                  <Link href={`/${catData.page_url}/${item.page_url}`}>
                    <h3 className="text-lg font-bold text-white bg-black/50 p-2 rounded">
                      {item.category_name}
                    </h3>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
