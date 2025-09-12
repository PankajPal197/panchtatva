"use client";
import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralConfig } from "@/app/store/slices/genralConfigSlice";
import Swal from "sweetalert2";
import ManageGeneralConfig from "../components/ManageGenralConfig";

const page = () => {
  const dispatch = useDispatch();
  const { data , loading, error  } = useSelector((state) => state.generalConfig);
console.log("Redux data:", data);
  const [formData, setFormData] = useState({
    website_name: "",
    phone_no: "",
    whats_phone_no: "",
    email_ids: "",
    google_map_url: "",
    facebok_url: "",
    insta_url: "",
    linkedin_url: "",
    twitter_url: "",
    youtube_url: "",
    address_1: "",
    address_2: "",
    home_title: "",
    home_desc: "",
    home_keyword: "",
    // _id: null,
  });

  const [images, setImages] = useState({
    header_logo: null,
    footer_logo: null,
    fav_icon_logo: null,
    apple_icon_logo: null,
  });
const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    dispatch(fetchGeneralConfig());
  }, [dispatch]);

useEffect(() => {
  console.log("Redux data:", data);
  if (data) {
    setFormData({
      website_name: data.website_name || "",
      phone_no: data.phone_no || "",
      whats_phone_no: data.whats_phone_no || "",
      email_ids: data.email_ids || "",
      google_map_url: data.google_map_url || "",
      facebok_url: data.facebok_url || "",
      insta_url: data.insta_url || "",
      linkedin_url: data.linkedin_url || "",
      twitter_url: data.twitter_url || "",
      youtube_url: data.youtube_url || "",
      address_1: data.address_1 || "",
      address_2: data.address_2 || "",
      home_title: data.home_title || "",
      home_desc: data.home_desc || "",
      home_keyword: data.home_keyword || "",
      // _id: data._id || null,
    });
    console.log("FormData after set:", formData);
  }
}, [data]);


  
  // useEffect(() => {
  //   if (data) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       ...data,
  //     }));
  //   }
  // }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleFileChange = (e) => {
  const { name, files } = e.target;
  const file = files[0];
  if (file) {
    setImages({ ...images, [name]: file });
    setImagePreviews({ ...imagePreviews, [name]: URL.createObjectURL(file) });
  }
};
  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setImages({ ...images, [name]: files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key] || "");
    }
    for (const key in images) {
      const file = images[key];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          Swal.fire({
            icon: "error",
            title: "File Too Large",
            text: `${key.replace(/_/g, " ").toUpperCase()} must be under 2MB`,
          });
          return;
        }
        form.append(key, file);
      }
    }
try {
    const res = await fetch("/api/general_config", {
      method: "POST", // hamesha POST bhejo
      body: form,
    });

    const result = await res.json();
    console.log("Result:", result);

    if (result.success) {
      Swal.fire("Success", result.message, "success");
    } else {
      Swal.fire("Error", result.message, "error");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
  //   const method = formData._id ? "PUT" : "POST"; 
  //   const url = formData._id 
  // ? `/api/general_config/${formData._id}`
  // : "/api/general_config";
  // const res = await fetch(url, {
  //   method,
  //   body: form,
  // });
  
    // const res = await fetch("/api/general_config", {
    //   method: "POST",
    //   body: form,
    // });

    const result = await res.json();
     console.log("Submit result:", result);
    if (result.success) {
      Swal.fire("Success", result.message, "success");
      dispatch(fetchGeneralConfig());
    } else {
      Swal.fire("Error", result.message, "error");
    }
  };
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/general_config");
  //     const json = await res.json();
  //     if (json.success && json.data) {
  //       const config = json.data;
  //       setFormData((prev) => ({
  //         ...prev,
  //         ...config,
  //       }));

  //       // Set preview for existing images
  //       ["header_logo", "footer_logo", "fav_icon_logo", "apple_icon_logo"].forEach((key) => {
  //         if (config[key]) {
  //           setImagePreviews((prev) => ({
  //             ...prev,
  //             [key]: `/general_config/${config[key]}`,
  //           }));
  //         }
  //       });
  //     }
  //   };
  //   fetchData();
  // }, []);

 
console.log(data)

  return (
    <>
      <Layout>
        {/* <ManageGeneralConfig /> */}
       <section className="p-3">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex items-center justify-between">
              <div className="text-2xl fw-bold text-gray-500 ">
                General Configuration
              </div>
              <div className="">
                <button
                  type="submit"
                  className="mt-3 px-4 py-2 bg-red-700 text-white font-bold "
                >
                  Save
                </button>
              </div>
            </div>
            <hr className="bg-red-500 w-100" />
            <div className="col-12 form-control">
              <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
                Website Configuration
              </div>
              {/* website part  */}
              <div className="row mt-4 ">
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Website Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="website_name"
                        value={formData.website_name ?? ""}   // null/undefined बचाने के लिए
  onChange={handleInputChange}
                        // value={formData.website_name || ""}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Contact Numbers <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 ">
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Email Addresses <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        className="form-control"
                        name="email_ids"
                        value={formData.email_ids}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        WhatsApp Number <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="whats_phone_no"
                        value={formData.whats_phone_no}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 bg-gray-200 p-1 mt-3">
                <div className="font-medium text-md p-1">
                  Social Profile Links
                </div>
              </div>
              {/* social profile part  */}
              <div className="row mt-4 ">
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Google Map URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="google_map_url"
                        value={formData.google_map_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Facebook URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="facebok_url"
                        value={formData.facebok_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Twitter URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="twitter_url"
                        value={formData.twitter_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Instagram URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="insta_url"
                        value={formData.insta_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Youtube URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Linkedin URL <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 bg-gray-200 p-1 mt-3">
                <div className="font-medium text-md p-1">Addresses</div>
              </div>
              {/* addresses  */}
              <div className="row mt-4 ">
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Registered Addresses{" "}
                        <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        cols={3}
                        rows={3}
                        type="text"
                        className="form-control"
                        name="address_1"
                        value={formData.address_1}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Office Addresses <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        cols={3}
                        rows={3}
                        type="text"
                        className="form-control"
                        name="address_2"
                        value={formData.address_2}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 bg-gray-200 p-1 mt-3">
                <div className="font-medium text-md p-1">
                  Home Page COnfiguration
                </div>
              </div>
              {/* home page Configuration */}
              <div className="row mt-4 ">
                <div className="col-12 mt-3">
                  <div className="row items-center">
                    <div className="col-md-2">
                      SEO Title <span className="text-red-600">*</span>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        name="home_title"
                        value={formData.home_title}
                        onChange={handleInputChange}
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
                        type="text"
                        className="form-control"
                        name="home_desc"
                        value={formData.home_desc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        SEO Keywords <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        cols={3}
                        rows={3}
                        type="text"
                        className="form-control"
                        name="home_keyword"
                        value={formData.home_keyword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 bg-gray-200 p-1 mt-3">
                <div className="font-medium text-md p-1">Images Assets</div>
              </div>
              {/* Images part  */}
              <div className="row mt-4 ">
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Logo <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="file"
                        className="form-control"
                        name="header_logo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Favicon <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="file"
                        className="form-control"
                        name="fav_icon_logo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Logo Footer <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="file"
                        className="form-control"
                        name="footer_logo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Apple Touch Icon <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="file"
                        className="form-control"
                        name="apple_icon_logo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default page;
