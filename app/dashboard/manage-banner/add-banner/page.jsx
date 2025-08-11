"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createHomeBanner } from "@/app/store/slices/bannerSlice";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    heading_1: "",
    heading_2: "",
    heading_3: "",
    status: "active",
    image_name: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image_name: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading_1 || !formData.image_name) {
      return Swal.fire("Error", "Heading and image are required", "error");
    }

    const payload = new FormData();
    payload.append("heading_1", formData.heading_1);
    payload.append("heading_2", formData.heading_2);
    payload.append("heading_3", formData.heading_3);
    payload.append("status", formData.status);
    payload.append("image_name", formData.image_name);

    try {
      const result = await dispatch(createHomeBanner(payload));
      if (result?.payload?.success) {
        Swal.fire(
          "Success!",
          "Banner created and saved successfully",
          "success"
        );
        setFormData({
          heading_1: "",
          heading_2: "",
          heading_3: "",
          status: "active",
          image_name: null,
        });
        router.push("/dashboard/manage-banner"); 
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
          <div className="text-2xl fw-bold text-gray-500 ">Add/Edit Banner</div>
          <div>
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-banner">
              <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                Reset
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>

      <section className="px-3">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Banner Details
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-4"
        >
          <div className="row">
            {["heading_1", "heading_2", "heading_3"].map((field, index) => (
              <div className="col-md-6 mt-3" key={index}>
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Banner Heading {index + 1}{" "}
                      <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-md-6 mt-3">
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
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                    // required
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
