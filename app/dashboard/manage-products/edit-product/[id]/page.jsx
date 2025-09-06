"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/dashboard/components/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import ProductDetail from "@/app/dashboard/components/ProductDetail";
import CKEditorClient from "@/app/dashboard/components/CKEditorClient";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "@/app/store/slices/productSlice";
import Swal from "sweetalert2";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedProduct, categories, loading } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    page_url: "",
    status: "active",
    extra_heading_1: "",
    extra_heading_2: "",
    extra_heading_3: "",
    extra_heading_4: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    color: "",
    price: "",
    stock: "",
    discount: "",
    rating: "",
    short_content_1: "",
    short_content_2: "",
    long_content_1: "",
    long_content_2: "",
    image_name_1: null,
    image_name_2: null,
    image_name_3: null,
    image_name_4: null,
    _id: "",
  });

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        product_name: selectedProduct.product_name || "",
        category_id: selectedProduct.category_id || "",
        page_url: selectedProduct.page_url || "",
        extra_heading_1: selectedProduct.extra_heading_1 || "",
        extra_heading_2: selectedProduct.extra_heading_2 || "",
        extra_heading_3: selectedProduct.extra_heading_3 || "",
        extra_heading_4: selectedProduct.extra_heading_4 || "",
        seo_title: selectedProduct.seo_title || "",
        seo_description: selectedProduct.seo_description || "",
        seo_keywords: selectedProduct.seo_keywords || "",
        // color: selectedProduct.color || "",
        color:
          selectedProduct.color?.[0]?.name ||
          selectedProduct.color?.[0]?.hex ||
          selectedProduct.color?.[0]?.rgb ||
          "",
        price: selectedProduct.price || 1,
        stock: selectedProduct.stock || "",
        discount: selectedProduct.discount || "",
        rating: selectedProduct.rating || 1,
        short_content_1: selectedProduct.short_content_1 || "",
        short_content_2: selectedProduct.short_content_2 || "",
        long_content_1: selectedProduct.long_content_1 || "",
        long_content_2: selectedProduct.long_content_2 || "",
        sort_order: selectedProduct.sort_order || 1,
        status: selectedProduct.status || "active",
        image_name_1: selectedProduct.image_name_1 || null,
        image_name_2: selectedProduct.image_name_2 || null,
        image_name_3: selectedProduct.image_name_3 || null,
        image_name_4: selectedProduct.image_name_4 || null,
        _id: selectedProduct._id,
      });
    }
  }, [selectedProduct]);
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
  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevImages) => ({
        ...prevImages,
        [name]: files[0],
      }));
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPayload = {
        ...formData,
        id: formData._id,
      };
      const resultAction = await dispatch(
        updateProduct({ updatedData: updatedPayload })
      );

      if (updateProduct.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "Product updated successfully!", "success");
        router.push("/dashboard/manage-products");
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  // if (loading || !selectedProduct) return <div>Loading...</div>;
  return (
    <Layout>
      <section className="p-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Edit Product: {formData.product_name}
          </div>
          <div className="">
            <Link href="../" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="../add-product">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Add Service
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-full" />
      </section>
      <section className="p-3">
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Service Detail
        </div>

        <ProductDetail />

        <form
          className="mt-3"
          onSubmit={handleUpdate}
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
                    value={formData.product_name}
                    onChange={handleInputChange}
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
                    name="page_url"
                    value={formData.page_url}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category For URL <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    name="category_id"
                    value={formData.category_id || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option className="form-control" value="">
                      Select category
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
                    value={formData.status}
                    onChange={handleInputChange}
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
                    City or Category<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select className="form-select" name="city_category">
                    <option className="form-control" value={"both"}>
                      Both
                    </option>
                    <option className="form-control" value={"city"}>
                      City
                    </option>
                    <option className="form-control" value={"category"}>
                      Category
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Link Product<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select className="form-select" name="linked_product">
                    <option className="form-control" value={"both"}>
                      Select
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Extra Spec 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="extra_heading_1"
                    value={formData.extra_heading_1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Extra Spec 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="extra_heading_2"
                    value={formData.extra_heading_2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Extra Spec 3 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="extra_heading_3"
                    value={formData.extra_heading_3}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Extra Spec 4 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="extra_heading_4"
                    value={formData.extra_heading_4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Seo Title <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Price <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Stock <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>Discount</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>Colors</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>Rating</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    SEO Description<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <textarea
                    cols={3}
                    rows={3}
                    className="form-control"
                    name="seo_description"
                    value={formData.seo_description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    SEO Keywords<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <textarea
                    cols={3}
                    rows={3}
                    className="form-control"
                    name="seo_keywords"
                    value={formData.seo_keywords}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Short Description 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <textarea
                    cols={3}
                    rows={3}
                    className="form-control"
                    name="short_content_1"
                    value={FormData.short_content_1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Short Description 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <textarea
                    cols={3}
                    rows={3}
                    className="form-control"
                    name="short_content_2"
                    value={formData.short_content_2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <div className="row items-center">
                <div className="col-md-2 ">
                  <label>
                    Long Description 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-10">
                  <div className="ck-editor">
                    <CKEditorClient
                      name="long_content_1"
                      value={formData.long_content_1}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <div className="row items-center">
                <div className="col-md-2 ">
                  <label>
                    Specification <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-10">
                  <div className="ck-editor">
                    <CKEditorClient
                      name="long_content_2"
                      value={formData.long_content_2}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Product Image 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_name_1"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {selectedProduct?.image_name_1 && (
                    <img
                      src={selectedProduct.image_name_1}
                      alt="Current Banner"
                      className="mt-2"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Product Image 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_name_2"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {selectedProduct?.image_name_2 && (
                    <img
                      src={selectedProduct.image_name_2}
                      alt="Current Banner"
                      className="mt-2"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Product Image 3 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_name_3"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {selectedProduct?.image_name_3 && (
                    <img
                      src={selectedProduct.image_name_3}
                      alt="Current Banner"
                      className="mt-2"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Product Image 4 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_name_4"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {selectedProduct?.image_name_4 && (
                    <img
                      src={selectedProduct.image_name_4}
                      alt="Current Banner"
                      className="mt-2"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="px-3 py-2 flex items-center justify-center">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Update
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default page;
