"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import {
  getSectionById,
  updateHomePage,
} from "@/app/store/slices/sectionSlice";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HomepageDropdown from "./HomepageDropdown";
const CKEditorClient = dynamic(() => import("../components/CKEditorClient"), {
  ssr: false,
});

const SectionEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedBanner, loading } = useSelector((state) => state.homePage);

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
    image_1: null,
    image_2: null,
  });

  useEffect(() => {
    dispatch(getSectionById(id));
  }, [id]);

  useEffect(() => {
    if (selectedBanner) {
      setFormData({
        section_name: selectedBanner.section_name || "",
        m_id: selectedBanner.m_id || "",
        heading_1: selectedBanner.heading_1 || "",
        heading_2: selectedBanner.heading_2 || "",
        heading_3: selectedBanner.heading_3 || "",
        short_content_1: selectedBanner.short_content_1 || "",
        short_content_2: selectedBanner.short_content_2 || "",
        long_content_1: selectedBanner.long_content_1 || "",
        long_content_2: selectedBanner.long_content_2 || "",
        sort_order: selectedBanner.sort_order || 1,
        status: selectedBanner.status || "active",
        image_1: selectedBanner.image_1 || "",
        image_2: selectedBanner.image_2 || "",
        _id: selectedBanner._id,
      });
    }
  }, [selectedBanner]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        updateHomePage({ updatedData: updatedPayload })
      );

      if (updateHomePage.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "Home Page updated successfully!", "success");
        router.push("/dashboard/manage-home-page");
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  // console.log(selectedBanner);

  // if (loading || !selectedBanner) return <div>Loading...</div>;
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
              <label>Section Name</label>{" "}
              <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                name="section_name"
                value={formData.section_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <HomepageDropdown formData={formData} setFormData={setFormData} />

        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Heading 1</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                name="heading_1"
                value={formData.heading_1}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Heading 2</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                name="heading_2"
                value={formData.heading_2}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="row items-center">
            <div className="col-md-3">
              <label>Heading 3</label> <span className="text-red-600">*</span>
            </div>
            <div className="col-md-9">
              <input
                name="heading_3"
                value={formData.heading_3}
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
              {selectedBanner?.image_1 && (
                <img
                  src={selectedBanner.image_1}
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
              {selectedBanner?.image_2 && (
                <img
                  src={selectedBanner.image_2}
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

export default SectionEditForm;
