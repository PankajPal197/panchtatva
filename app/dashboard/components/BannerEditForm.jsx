"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannerById,
  updateHomeBanner,
} from "@/app/store/slices/bannerSlice";

import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const EditBannerForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedBanner, loading } = useSelector((state) => state.homeBanner);

  const [formData, setFormData] = useState({
    heading_1: "",
    heading_2: "",
    heading_3: "",
    sort_order: 0,
    status: "active",
    image_name: null,
  });

  useEffect(() => {
    dispatch(getBannerById(id));
  }, [id]);

  useEffect(() => {
    if (selectedBanner) {
      setFormData({
        heading_1: selectedBanner.heading_1 || "",
        heading_2: selectedBanner.heading_2 || "",
        heading_3: selectedBanner.heading_3 || "",
        sort_order: selectedBanner.sort_order || 1,
        status: selectedBanner.status || "active",
        image_name: selectedBanner.image_name || "",
        _id: selectedBanner._id,
      });
    }
  }, [selectedBanner]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image_name: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPayload = {
        ...formData,
        id: formData._id,
      };
      const resultAction = await dispatch(
        updateHomeBanner({ updatedData: updatedPayload })
      );

      if (updateHomeBanner.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "Banner updated successfully!", "success");
        router.push("/dashboard/manage-banner"); // change route as needed
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };
  console.log(selectedBanner)

  if (loading || !selectedBanner) return <div>Loading...</div>;
  // console.log(resultAction);
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
                Banner Image <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="file"
                className="form-control"
                name="image_name"
                onChange={handleFileChange}
                accept="image/*"
              />
              {selectedBanner?.image_name && (
                <img
                  src={selectedBanner.image_name}
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

export default EditBannerForm;
