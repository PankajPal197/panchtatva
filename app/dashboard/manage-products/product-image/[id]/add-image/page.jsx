"use client";

import Layout from "@/app/dashboard/components/Layout";
import ProductDetail from "@/app/dashboard/components/ProductDetail";
import { createImage } from "@/app/store/slices/imageSlice";
import { getProductById } from "@/app/store/slices/productSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const page = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
    const { selectedProduct,categories, loading } = useSelector((state) => state.product);
  
  const [formData, setFormData] = useState({
    image_title: "",
    product_id: "",
    image_name_1: null,
    status: "",
  });
  const handleInputChange = (e) => {
     const { name, type, files, value } = e.target;
    setFormData({
    ...formData,
    [name]: type === "file" ? files[0] : value,
  });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_name_1) {
      return Swal.fire("Error", "Image are required", "error");
    }
    const payload = new FormData();
    payload.append("image_title", formData.image_title);
    payload.append("product_id", formData.product_id);
    payload.append("image_name_1", formData.image_name_1);
    payload.append("status", formData.status);
    try {
      const result = await dispatch(createImage(formData)).unwrap();
      console.log(result);

      if (result?.success && result?.productData?._id) {
        Swal.fire(
          "Success!",
          "Image created and saved successfully",
          "success"
        );
        setFormData({
          image_title: "",
          image_name_1: "",
          product_id: "",
          status: "active",
        });
        router.push(
          `/dashboard/manage-products/product-image/${result.productData._id}`
        );
        Swal.fire("Error!", "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
    useEffect(() => {
      dispatch(getProductById(id));
    }, [id]);
    useEffect(() => {
      if (selectedProduct) {
        setFormData({
         
          product_id: selectedProduct.product_id || "",
          
          _id: selectedProduct._id,
        });
      }
    }, [selectedProduct]);
//  console.log(selectedProduct)
  return (
    <Layout>
      <section className="px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Edit Product: test
          </div>
          <div className="">
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-product">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Add Service
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>
      <section className="px-5 py-1">
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Service Detail
        </div>

        <ProductDetail />

        <form
          className="mt-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="row ">
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Image Alias <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="image_title"
                    onChange={handleInputChange}
                    value={formData.image_title}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    name="product_id"
                    onChange={handleInputChange}
                    value={formData.product_id}
                  >
                    <option className="form-control" value={"active"}>
                      Select Category
                    </option>
                     {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category_name}
                      </option>
                    ))}
                    
                  </select>
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
                    onChange={handleInputChange}
                    value={formData.status}
                  >
                    <option className="form-control" value={"active"}>
                      Active
                    </option>
                    <option className="form-control" value={"inactive"}>
                      In-Active
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Service Image <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_name_1"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="px-3 py-2 flex items-center justify-center">
              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded"
              >
                Save
              </button>
              <Link href={"./section-add"} className="ml-3">
                <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                  Reset
                </button>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default page;
