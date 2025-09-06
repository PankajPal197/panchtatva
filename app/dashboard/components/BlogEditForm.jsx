"use client";
import React, { useState, useEffect } from "react";
// import CKEditorClient from "./CKEditorClient";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { getBlogById, updateBlog } from "@/app/store/slices/blogSlice";

const CKEditorClient = dynamic(() => import("../components/CKEditorClient"), {
  ssr: false,
});
const BlogEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedBanner, loading } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    blog_name: "",
    page_url: "",
    blog_date: "",
    blog_author: "",
    status: "active",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    short_description: "",
    long_description: "",
    sort_order: 0,
    blog_image_1: null,
    blog_image_2: null,
    _id: "",
  });

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [id]);

  useEffect(() => {
    if (selectedBanner) {
      setFormData({
        blog_name: selectedBanner.blog_name || "",
        page_url: selectedBanner.page_url || "",
        blog_date: selectedBanner.blog_date || "",
        blog_author: selectedBanner.blog_author || "",
        seo_title: selectedBanner.seo_title || "",
        seo_description: selectedBanner.seo_description || "",
        seo_keywords: selectedBanner.seo_keywords || "",
        short_description: selectedBanner.short_description || "",
        long_description: selectedBanner.long_description || "",
        sort_order: selectedBanner.sort_order || 1,
        status: selectedBanner.status || "active",
        blog_image_1: selectedBanner.blog_image_1 || null,
        blog_image_2: selectedBanner.blog_image_2 || null,
        _id: selectedBanner._id,
      });
    }
  }, [selectedBanner]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
   const handleChange = (e) => {
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
      setFormData((prevImages) => ({
        ...prevImages,
        [name]: files[0],
      }));
    }
  };
  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPayload = {
        ...formData,
        id: formData._id,
      };
      const resultAction = await dispatch(
        updateBlog({ updatedData: updatedPayload })
      );

      if (updateBlog.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "Blog updated successfully!", "success");
        router.push("/dashboard/manage-blog"); // change route as needed
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  if (loading || !selectedBanner) return <div>Loading...</div>;
  return (
    <form
      onSubmit={handleUpdate}
      encType="multipart/form-data"
      className="mt-4"
    >
      <div className="row">
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Blog Name</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                name="blog_name"
                value={formData.blog_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Page Url</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                name="page_url"
                value={formData.page_url}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Blog Author</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                type="date"
                name="blog_date"
                value={formData.blog_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Blog Author</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                type="type"
                name="blog_author"
                value={formData.blog_author}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Status</label>
            </div>
            <div className="col-md-9">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value={formData.status}>
                  {formData.status.charAt(0).toUpperCase() +
                    formData.status.slice(1)}
                </option>
                <option
                  value={formData.status === "active" ? "inactive" : "active"}
                >
                  {formData.status === "active" ? "Inactive" : "Active"}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Seo Title</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                type="type"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                className="form-control"
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
                onChange={handleChange}
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
                name="seo_keywords"
                value={formData.seo_keywords}
                onChange={handleChange}
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
                onChange={handleChange}
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

              {selectedBanner?.blog_image_1 && (
                <img
                  src={selectedBanner.blog_image_1}
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
                Blog Image 2 <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="file"
                className="form-control"
                name="blog_image_2"
                onChange={handleFileChange}
                accept="image/*"
              />

              {selectedBanner?.blog_image_2 && (
                <img
                  src={selectedBanner.blog_image_2}
                  alt="Current Banner"
                  className="mt-2"
                  style={{ maxHeight: "150px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 flex items-center justify-center">
        <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default BlogEditForm;
