"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import Link from "next/link";
import { CiStar } from "react-icons/ci";

    const brand = [
    {
        id: 1,
        brand: "Trendyzone",
        name: "Lesh Sensation Wash",
        image: "/slider/slider1.jpg",
        catregoryUrl: "natural-1-mukhi-rudhraksh",
        pageUrl: "lesh-sensation-wash",
        color:'red',
        rating: 5,
    },
    {
        id: 2,
        brand: "Trendyzone",
        name: "Aromatic Body Wash",
        image: "/slider/slider1.jpg",
        pageUrl: "/natural-1-mukhi-rudhraksh/aromatic-body-wash",
        color:'green',
        rating: 4,
    },
    {
        id: 3,
        brand: "Trendyzone",
        name: "Luxury Face Cream",
        image: "/slider/slider1.jpg",
        pageUrl: "/rudhrakhs-mala/luxury-face-cream",
        color:'yellow',
        rating: 5,
    },
    {
        id: 4,
        brand: "Trendyzone",
        name: "Organic Hair Oil",
        image: "/slider/slider1.jpg",
        pageUrl: "/product/product-details.html",
        color:'pink',
        rating: 4,
    },
    {
        id: 5,
        brand: "Trendyzone",
        name: "Glow Night Serum",
        image: "/slider/slider1.jpg",
        pageUrl: "/product/product-details.html",
        color:'red',
        rating: 5,
    },
    {
        id: 6,
        brand: "test",
        name: "Glow Night Serum",
        image: "/slider/slider1.jpg",
        pageUrl: "/product/product-details.html",
        rating: 5,
        color:'green',
    },
    ];
const page = () => {
  return (
    <Layout>
      <Breadcumbs title={"Our Category"} pageUrl={"category"} />
      <section className="mt-3 mb-3">
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
                    <span className="text-white text-center">
                      Availability
                    </span>
                  </div>
                  <ul>
                    <li><input type="checkbox" /> In Stock</li>
                    <li><input type="checkbox" /> Out of Stock</li>
                  </ul>
                </div>
                 <div className="bg-amber-900  p-2">
                    <span className="text-white text-center">
                      Color
                    </span>
                  </div>
                  <ul>
                    <li>Red</li>
                    <li>Blue</li>
                    <li>
                        Yellow
                    </li>
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
            <div className="col-md-9">
              <div className="row">
                {brand.map((item) => (
                  <div className="col-md-4 mt-3" key={item.id}>
                    <div className="card p-3">
                      <Link href={`/${item.catregoryUrl}/${item.pageUrl}`}>
                        <span className="text-xs text-gray-500">
                          {item.brand}
                        </span>

                        <h3 className="text-lg font-bold">{item.name}</h3>

                        <ul className="flex items-center">
                          {[...Array(item.rating)].map((_, i) => (
                            <li key={i} className="text-yellow-500">
                              <CiStar size={24} />
                            </li>
                          ))}
                        </ul>

                        <div className="image mt-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-60 object-cover rounded-lg"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
