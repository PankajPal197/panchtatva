"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const page = () => {
  const [editorData, setEditorData] = useState("");
  return (
    <Layout>
      <section className="px-5 py-3">
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
        <hr className="bg-red-500 w-100" />
      </section>
      <section className="px-5 py-1">
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Categories Detail
        </div>
        <form className="mt-4">
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
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row items-center">
              <div className="col-md-3">
                <label>
                  Parent Category <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="col-md-9">
                <select className="form-select" name="mcategory_id">
                  <option value={0}>Root Category</option>
                  <option value={1}>Service category</option>
                  <option value={45}>office container</option>
                  <option value={45}>office container</option>
                  <option value={45}>office container</option>
                  <option value={45}>office container</option>
                  <option value={45}>office container</option>
                </select>
              </div>
            </div>
          </div>
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
                  <input type="text" className="form-control" name="page_url" />
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
                  <select className="form-select" name="status">
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
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Long Description 1 <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <div className="ck-editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                        console.log("Editor data:", data);
                      }}
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
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                      }}
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
