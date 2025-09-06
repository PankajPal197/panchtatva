"use client";
import { useEffect, useState } from "react";
import {
  getCategoryById,
  updateHomeCategory,
} from "@/app/store/slices/categorySlice";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CategoryDropdown from "./CategoryDropdown";
import Swal from "sweetalert2";
const CKEditorClient = dynamic(() => import("./CKEditorClient"), {
  ssr: false,
});

const CategoryEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedCategory, loading } = useSelector((state) => state.category);

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
    image_name_1: null,
    image_name_2: null,
    image_name_3: null,
    image_name_4: null,
    _id: "",
  });

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [id]);

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        category_name: selectedCategory.category_name || "",
        parent_category_id: selectedCategory.parent_category_id || "",
        page_url: selectedCategory.page_url || "",
        extra_heading_1: selectedCategory.extra_heading_1 || "",
        extra_heading_2: selectedCategory.extra_heading_2 || "",
        extra_heading_3: selectedCategory.extra_heading_3 || "",
        seo_title: selectedCategory.seo_title || "",
        seo_description: selectedCategory.seo_description || "",
        seo_keywords: selectedCategory.seo_keywords || "",
        short_content_1: selectedCategory.short_content_1 || "",
        short_content_2: selectedCategory.short_content_2 || "",
        long_content_1: selectedCategory.long_content_1 || "",
        long_content_2: selectedCategory.long_content_2 || "",
        sort_order: selectedCategory.sort_order || 1,
        status: selectedCategory.status || "active",
        image_name_1: selectedCategory.image_name_1 || null,
        image_name_2: selectedCategory.image_name_2 || null,
        image_name_3: selectedCategory.image_name_3 || null,
        image_name_4: selectedCategory.image_name_4 || null,
        _id: selectedCategory._id,
      });
    }
  }, [selectedCategory]);
  
  const handleChange = (e) => {
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
        updateHomeCategory({ updatedData: updatedPayload })
      );

      if (updateHomeCategory.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "Category updated successfully!", "success");
        router.push("/dashboard/manage-categories"); 
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
    if (loading || !selectedCategory) return <div>Loading...</div>;
  };
  return (
    <form
      onSubmit={handleUpdate}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
               {selectedCategory?.image_name_1 && (
                <img
                  src={selectedCategory.image_name_1}
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
               {selectedCategory?.image_name_2 && (
                <img
                  src={selectedCategory.image_name_2}
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
               {selectedCategory?.image_name_3 && (
                <img
                  src={selectedCategory.image_name_3}
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
               {selectedCategory?.image_name_4 && (
                <img
                  src={selectedCategory.image_name_4}
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
  );
};

export default CategoryEditForm;
