"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createHomePage } from "@/app/store/slices/sectionSlice";
import Swal from "sweetalert2";

const CKEditorClient = dynamic(
  () => import("../../components/CKEditorClient"),
  { ssr: false }
);
const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    section_name: "",
    m_id: "0",
    heading_1: "",
    status: "active",
    heading_2: "",
    heading_3: "",
    short_content_1: "",
    short_content_2: "",
    long_content_1: "",
    long_content_2: "",
  });
  const [images, setImages] = useState({
    image_1: null,
    image_1: null,
  });

  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "section_name") {
      setFormData({
        ...formData,
        section_name: value,
        // page_url: value.toLowerCase().replace(/\s+/g, "_"),
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

    if (!formData.section_name) {
      return Swal.fire("Error", "Category Name are required", "error");
    }

    const payload = new FormData();
    payload.append("section_name", formData.section_name);
    payload.append("m_id", formData.m_id);
    payload.append("heading_1", formData.heading_1);
    payload.append("heading_2", formData.heading_2);
    payload.append("heading_3", formData.heading_3);
    payload.append("short_content_1", formData.short_content_1);
    payload.append("short_content_2", formData.short_content_2);
    payload.append("image_1", images.image_1);
    payload.append("image_1", images.image_2);
    payload.append("long_content_1", formData.long_content_1);
    payload.append("long_content_2", formData.long_content_2);
    payload.append("status", formData.status);

    try {
      const result = await dispatch(createHomePage(payload));
      if (result?.payload?.success) {
        Swal.fire(
          "Success!",
          "Home Section created and saved successfully",
          "success"
        );
        setFormData({
          section_name: "",
          m_id: "",
          status: "active",
          heading_1: "",
          heading_2: "",
          heading_3: "",
          short_content_1: "",
          short_content_2: "",
          long_content_1: "",
          long_content_2: "",
        });
        setImages({
          image_1: null,
          image_2: null,
        });
        router.push("/dashboard/manage-home-page");
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
            Add/Edit Section
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
          Section Detail
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
                    Section Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="section_name"
                    value={formData.section_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Parent Category <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <select className="form-select" name="m_id">
                    <option value="0" style={{ color: "red" }}>
                      Root Category
                    </option>
                     <option value="1" style={{ color: "green" }}>
                      Paula Mclean1
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Heading 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="heading_1"
                    value={formData.heading_1}
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
                    Heading 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="heading_2"
                    value={formData.heading_2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Heading 3 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="heading_3"
                    value={formData.heading_3}
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
                    Section Image 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_1"
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
                    Section Image 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    name="image_2"
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
