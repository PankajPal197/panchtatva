"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createHomeCategory } from "@/app/store/slices/categorySlice";
import Swal from "sweetalert2";
import CategoryDropdown from "../../components/CategoryDropdown";
// import CKEditorClient from "../../components/CKEditorClient";

const CKEditorClient = dynamic(
  () => import("../../components/CKEditorClient"),
  { ssr: false }
);
const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    category_name: "",
    parent_category_id: "",
    page_url: "",
    status: "active",
    extra_heading_1: "",
    extra_heading_2: "",
    extra_heading_3: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    short_content_1: "",
    short_content_2: "",
    long_content_1: "",
    long_content_2: "",
  });
  const [images, setImages] = useState({
    image_name_1: null,
    image_name_2: null,
    image_name_3: null,
    image_name_4: null,
  });

  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_name") {
      setFormData({
        ...formData,
        category_name: value,
        page_url: value.toLowerCase().replace(/\s+/g, "_"),
        seo_title: value,
        seo_description: value,
        seo_keywords: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setImages((prevImages) => ({
        ...prevImages,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name) {
      return Swal.fire("Error", "Category Name are required", "error");
    }

    const payload = new FormData();
    payload.append("category_name", formData.category_name);
    payload.append("parent_category_id", formData.parent_category_id);
    payload.append("page_url", formData.page_url);
    payload.append("extra_heading_1", formData.extra_heading_1);
    payload.append("extra_heading_2", formData.extra_heading_2);
    payload.append("extra_heading_3", formData.extra_heading_3);
    payload.append("seo_title", formData.seo_title);
    payload.append("seo_description", formData.seo_description);
    payload.append("seo_keywords", formData.seo_keywords);
    payload.append("short_content_1", formData.short_content_1);
    payload.append("short_content_2", formData.short_content_2);
    payload.append("image_name_1", images.image_name_1);
    payload.append("image_name_2", images.image_name_2);
    payload.append("image_name_3", images.image_name_3);
    payload.append("image_name_4", images.image_name_4);
    payload.append("long_content_1", formData.long_content_1);
    payload.append("long_content_2", formData.long_content_2);
    payload.append("status", formData.status);

    try {
      const result = await dispatch(createHomeCategory(payload));
      if (result?.payload?.success) {
        Swal.fire(
          "Success!",
          "Category created and saved successfully",
          "success"
        );
        setFormData({
          category_name: "",
          parent_category_id: "",
          page_url: "",
          status: "active",
          extra_heading_1: "",
          extra_heading_2: "",
          extra_heading_3: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          short_content_1: "",
          short_content_2: "",
          long_content_1: "",
          long_content_2: "",
        });
        setImages({
          image_name_1: null,
          image_name_2: null,
          image_name_3: null,
          image_name_4: null,
        });
        router.push("/dashboard/manage-categories");
      } else {
        Swal.fire("Error!", "Something went wrong", "error");
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
          <div className="text-2xl fw-bold text-gray-500 ">
            Add/Edit Categories
          </div>
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
      <section className="px-3 mt-1">
        <div className="form-title bg-blue-700 text-white text-md  font-medium p-3">
          Categories Detail
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-3"
        >
          <div className="row ">
            <div className="col-md-6">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <CategoryDropdown formData={formData} setFormData={setFormData} />
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Page URL <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="page_url"
                    value={formData.page_url}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Extra Heading <span className="text-red-600">*</span>
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
                    Extra Heading 2 <span className="text-red-600">*</span>
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
                    Extra Heading 3 <span className="text-red-600">*</span>
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
                    value={formData.short_content_1}
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Long Description 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Long Description 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
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
                    Category Image 1 <span className="text-red-600">*</span>
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
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category Image 2 <span className="text-red-600">*</span>
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
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category Image 3 <span className="text-red-600">*</span>
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
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Category Image 4 <span className="text-red-600">*</span>
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
