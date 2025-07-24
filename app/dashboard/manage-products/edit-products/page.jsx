"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Libre_Franklin } from "next/font/google";
import ProductDetail from "../../components/ProductDetail";
import dynamic from "next/dynamic";

const CKEditorClient = dynamic(() => import('../../components/CKEditorClient'), { ssr: false })

const page = () => {
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

        <form className="mt-4" onSubmit="edit-product">
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
                  name="service_name"
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
                >
                    <option className="form-control">category 1</option>
                    <option className="form-control">category 2</option>
                    <option className="form-control">category 3</option>
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
                >
                    <option className="form-control" value={'active'}>Active</option>
                    <option className="form-control" value={'inactive'}>In-Active</option>
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
               <select
                  className="form-select"
                  name="city_category"
                >
                    <option className="form-control" value={'both'}>Both</option>
                    <option className="form-control" value={'city'}>City</option>
                    <option className="form-control" value={'category'}>Category</option>
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
               <select
                  className="form-select"
                  name="linked_product"
                >
                    <option className="form-control" value={'both'}>Select</option>
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
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
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
                    Short Description 1 <span className="text-red-600">*</span>
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
                    name="short_desc_2"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
                          <div className="row items-center">
                            <div className="col-md-3">
                              <label>
                                Long Description 2 <span className="text-red-600">*</span>
                              </label>
                            </div>
                            <div className="col-md-9">
                              <div className="ck-editor">
                                <CKEditorClient/>
                              </div>
                            </div>
                          </div>
                        </div>
            <div className="col-md-12 mt-3">
                          <div className="row items-center">
                            <div className="col-md-3">
                              <label>
                                Specification <span className="text-red-600">*</span>
                              </label>
                            </div>
                            <div className="col-md-9">
                              <div className="ck-editor">
                                <CKEditorClient/>
                              </div>
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
