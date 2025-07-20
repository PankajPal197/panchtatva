"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ProductDetail from "../../components/ProductDetail";

const page = () => {
  const [editorData, setEditorData] = useState("");
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
                  Image Alias <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="heading"
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
                  Service Image <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="col-md-9">
               <input 
               type="file"
                  className="form-control"
                  name="service-image"
                />
              </div>
            </div>
          </div>
           <div className="col-md-6 mt-3">
            <div className="row items-center">
              <div className="col-md-3">
                <label>
                  Image Section <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="col-md-9">
               <select
                  className="form-select"
                  name="section_id"
                >
                    <option className="form-control" value={'active'}>Main Image</option>
                    <option className="form-control" value={'inactive'}>In-Active</option>
                </select>
              </div>
            </div>
          </div>
           <div className="px-3 py-2 flex items-center justify-center">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Save
              </button>
              <Link href={"./section-add"} className="ml-3"><button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
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
