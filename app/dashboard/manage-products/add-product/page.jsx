"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/store/slices/productSlice";
import Swal from "sweetalert2";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_name: "",
    page_url: "",
    status: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product_name") {
      setFormData({
        ...formData,
        product_name: value,
        page_url: value.toLowerCase().replace(/\s+/g, "_"),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product_name) {
      return Swal.fire("Error", "Product Name are required", "error");
    }

    const payload = new FormData();
    payload.append("product_name", formData.product_name);
    payload.append("page_url", formData.page_url);
    payload.append("status", formData.status);

    try {
      const result = await dispatch(createProduct(formData)).unwrap();
      if (result?.success && result?.productData?._id) {
        Swal.fire(
          "Success!",
          "Product created and saved successfully",
          "success"
        );
        setFormData({
          product_name: "",
          page_url: "",
          status: "active",
        });
        router.push(
          `/dashboard/manage-products/edit-product/${result.productData._id}`
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">Add Product</div>
          <div className="">
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-category">
              <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                Reset
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>
      <section className="px-3">
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Service Detail
        </div>
        <form
          className="mt-2"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="row ">
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Service Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    onChange={handleInputChange}
                    value={formData.product_name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Service URL <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="service_url"
                    value={formData.page_url}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Status <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">In-Active</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 flex items-center justify-center">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default page;
