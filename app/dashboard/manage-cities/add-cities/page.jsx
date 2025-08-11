"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createCity } from "@/app/store/slices/citySlice";
import Swal from "sweetalert2";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    city_name: "",
    page_url: "",
    status: "active",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
      if (name === "city_name") {
        setFormData({
          ...formData,
          city_name: value,
          page_url: value.toLowerCase().replace(/\s+/g, "_"),
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
    }
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.city_name) {
        return Swal.fire("Error", "City Name are required", "error");
      }
  
      const payload = new FormData();
      payload.append("city_name", formData.city_name);
      payload.append("page_url", formData.page_url);
      payload.append("status", formData.status);
  
      try {
        const result = await dispatch(createCity(payload));
        if (result?.payload?.success) {
          Swal.fire("Success!", "City created and saved successfully", "success");
          setFormData({
            city_name: "",
            page_url: "",
            status: "active",
          });
          router.push("/dashboard/manage-cities");
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
          <div className="text-2xl fw-bold text-gray-500 ">Add/Edit City</div>
          <div className="">
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-cities">
              <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                Reset
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>
      <section className="px-3 mt-1">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          City Details
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
                    City Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="city_name"
                    value={formData.city_name}
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
