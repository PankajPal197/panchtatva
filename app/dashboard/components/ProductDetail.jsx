"use client";
import { fetchProduct, getProductById } from "@/app/store/slices/productSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { data: product} = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const id = product?.[0]?._id;

  return (
    <div>
      <section className="bg-gray-300 px-2 py-3 mt-2 shadow-2xl rounded">
        <div className="row items-center">
          <div className="col-md-2">
            <Link
              href={`/dashboard/manage-products/edit-product/${id}`}
              className=" px-2 py-2 text-decoration-none text-black text-xl shadow rounded p-2"
            >
              Enter Detail
            </Link>
          </div>
          <div className="col-md-2">
            <Link
              href={`/dashboard/manage-products/product-image/${id}`}
              className=" px-2 py-2 text-decoration-none text-black text-xl shadow rounded p-2"
            >
              Enter Images
            </Link>
          </div>
          <div className="col-md-2">
            <Link
              href={`/dashboard/manage-products/link-categories/${id}`}
              className=" px-2 py-2 text-decoration-none text-black text-xl shadow rounded p-2"
            >
              Enter City Content L1
            </Link>
          </div>
          <div className="col-md-2">
            <Link
              href={`/dashboard/manage-products/link-categories/${id}`}
              className=" px-2 py-2 text-decoration-none text-black text-xl shadow rounded p-2"
            >
              Enter City Content L2
            </Link>
          </div>
          <div className="col-md-2">
            <Link
              href={`/dashboard/manage-products/link-categories/${product?._id}`}
              className=" px-2 py-2 text-decoration-none text-black text-xl shadow rounded p-2"
            >
              Link Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
