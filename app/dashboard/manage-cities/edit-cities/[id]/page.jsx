"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { getCityById, updateCity } from "@/app/store/slices/citySlice";
import Swal from "sweetalert2";
import Layout from "@/app/dashboard/components/Layout";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedCity, loading } = useSelector((state) => state.city);
  const [formData, setFormData] = useState({
    city_name: "",
    page_url: "",
    status: "active",
  });

  useEffect(() => {
    dispatch(getCityById(id));
  }, [id]);

  useEffect(() => {
    if (selectedCity) {
      setFormData({
        city_name: selectedCity.city_name || "",
        page_url: selectedCity.page_url || "",
        sort_order: selectedCity.sort_order || 1,
        status: selectedCity.status || "active",
        _id: selectedCity._id,
      });
    }
  }, [selectedCity]);

  const handleChange = (e) => {
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
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPayload = {
        ...formData,
        id: formData._id,
      };
      const resultAction = await dispatch(
        updateCity({ updatedData: updatedPayload })
      );

      if (updateCity.fulfilled.match(resultAction)) {
        Swal.fire("Updated!", "City updated successfully!", "success");
        router.push("/dashboard/manage-cities");
      } else {
        throw new Error(resultAction.payload?.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
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
        {loading || !selectedCity ? (
          <div>Loading...</div>
        ) : (
          <form
            onSubmit={handleUpdate}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    >
                      <option value={formData.status}>
                        {formData.status.charAt(0).toUpperCase() +
                          formData.status.slice(1)}
                      </option>
                      <option
                        value={
                          formData.status === "active" ? "inactive" : "active"
                        }
                      >
                        {formData.status === "active" ? "Inactive" : "Active"}
                      </option>
                    </select>
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
        )}
      </section>
    </Layout>
  );
};

export default page;
