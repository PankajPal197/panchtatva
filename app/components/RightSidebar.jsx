"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEnquiry } from "../store/slices/enquirySlice";
import Swal from "sweetalert2";
const RightSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    subject: "",
    message: "",
    enquiry_page: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_email) {
      return Swal.fire("Error", "email are required", "error");
    }

    const payload = new FormData();
    payload.append("customer_name", formData.customer_name);
    payload.append("customer_email", formData.customer_email);
    payload.append("customer_phone", formData.customer_phone);
    payload.append("subject", formData.subject);
    payload.append("message", formData.message);
    payload.append("enquiry_page", formData.enquiry_page);

    try {
      const result = await dispatch(createEnquiry(payload));
      if (result?.payload?.success) {
        Swal.fire(
          "Success!",
          "Enquiry created and saved successfully",
          "success"
        );
        setFormData({
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          subject: "",
          message: "",
          enquiry_page: "",
        });
      } else {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  return (
    <div>
      <form
        className="form-control p-3 shadow rounded"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="font-medium text-2xl">Enquiry Form</div>
        <div className="row mt-3">
          <div className="col-md-6 mt-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mt-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mt-3">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mt-3">
            <input
              type="text"
              placeholder="Subject"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12 mt-3">
            <textarea
              className="form-control"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleInputChange}
            >
              Message
            </textarea>
          </div>
          <div className="col-12">
            <button className="btn-submit mt-3">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RightSidebar;
