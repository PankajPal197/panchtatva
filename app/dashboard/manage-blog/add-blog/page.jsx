"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
const CKEditorClient = dynamic(() => import('../../components/CKEditorClient'), { ssr: false })

const page = () => {
  return (
    <Layout>
      <section className="px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Add/Edit Blog
          </div>
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
        <hr className="bg-red-500 w-100" />
      </section>
      <section className="px-5 py-1">
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Blog Details
        </div>
        <form className="mt-4">
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
                  name="category_name"
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
                  <input type="text" className="form-control" name="page_url" />
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
                  <input type="date" className="form-control" name="blog_date" />
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
                  <input type="text" className="form-control" name="page_url" />
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
                  <select className="form-select" name="status">
                    <option value="active">Active</option>
                    <option value="inactive">In-Active</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-6">
                  <label>
                    Seo Title <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="seo_title"
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
                    name="extra_heading_2"
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
                    name="short_desc_1"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Long Description 2 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <div className="ck-editor">
                    <CKEditorClient
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
                    name="image_name_1"
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
                    name="image_name_2"
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
