"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/store/slices/blogSlice";
import Swal from "sweetalert2";

const CKEditorClient = dynamic(
  () => import("../../components/CKEditorClient"),
  { ssr: false }
);

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    blog_name: "",
    page_url: "",
    blog_date: "",
    status: "active",
    blog_author: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    short_description: "",
    long_description: "",
  });
  const [images, setImages] = useState({
    blog_image_1: null,
    blog_image_2: null,
  });

  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "blog_name") {
      setFormData({
        ...formData,
        blog_name: value,
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

    if (!formData.blog_name) {
      return Swal.fire("Error", "Blog are required", "error");
    }

    const payload = new FormData();
    payload.append("blog_name", formData.blog_name);
    payload.append("page_url", formData.page_url);
    payload.append("blog_date", formData.blog_date);
    payload.append("blog_author", formData.blog_author);
    payload.append("seo_title", formData.seo_title);
    payload.append("seo_description", formData.seo_description);
    payload.append("seo_keywords", formData.seo_keywords);
    payload.append("short_description", formData.short_description);
    payload.append("long_description", formData.long_description);
    payload.append("blog_image_1", images.blog_image_1);
    payload.append("blog_image_2", images.blog_image_2);
    payload.append("status", formData.status);

    try {
      const result = await dispatch(createBlog(payload));
      if (result?.payload?.success) {
        Swal.fire("Success!", "Blog created and saved successfully", "success");
        setFormData({
          blog_name: "",
          page_url: "",
          blog_date: "",
          status: "active",
          blog_author: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          short_description: "",
          long_description: "",
        });
        setImages({
          blog_image_1: null,
          blog_image_2: null,
        });
        router.push("/dashboard/manage-blog");
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
          <div className="text-2xl fw-bold text-gray-500 ">Add/Edit Blog</div>
          <div className="">
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-blog">
              <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                Reset
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>
      <section className="px-3 mt-1">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Blog Details
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-3"
        >
          <div className="row ">
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Blog Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="blog_name"
                    value={formData.blog_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Blog Date <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="date"
                    className="form-control"
                    name="blog_date"
                    value={formData.blog_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Blog Author <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="blog_author"
                    value={formData.blog_author}
                    onChange={handleInputChange}
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>Seo Title</label>
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
                  <label>SEO Description</label>
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
                  <label>SEO Keywords</label>
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
                    Short Description <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <textarea
                    cols={3}
                    rows={3}
                    className="form-control"
                    name="short_description"
                    value={formData.short_description}
                     onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="row items-center">
                <div className="col-md-12">
                  <label>
                    Long Description 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-12">
                  <div className="ck-editor">
                    <CKEditorClient
                      name="long_description"
                      value={formData.long_description}
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
                    Blog Image 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="blog_image_1"
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
                    Blog Image 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="blog_image_1"
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
