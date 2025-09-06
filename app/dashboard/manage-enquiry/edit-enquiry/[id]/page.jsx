"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/app/dashboard/components/Layout";
import { getEnquiryById } from "@/app/store/slices/enquirySlice";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedEnquiry, loading } = useSelector((state) => state.enquiry);
  const [formData, setFormData] = useState({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      subject: "",
      message: "",
      enquiry_page: "",
      createdAt:"",
    });

  useEffect(() => {
    dispatch(getEnquiryById(id));
  }, [id]);

    useEffect(() => {
    if (selectedEnquiry) {
      setFormData((prev) => ({
        ...prev,
        customer_name: selectedEnquiry.customer_name || "",
        customer_email: selectedEnquiry.customer_email || "",
        customer_phone: selectedEnquiry.customer_phone || "",
        subject: selectedEnquiry.subject || "",
        message: selectedEnquiry.message || "",
        enquiry_page: selectedEnquiry.enquiry_page || "",
        createdAt: selectedEnquiry.createdAt || "",
      }));
    }
  }, [selectedEnquiry]);

  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">Add/Edit City</div>
          <div className="">
            <Link href="../" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>
      <section className="px-3 mt-1">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Enquiry Details
        </div>
        {loading || !selectedEnquiry ? (
          <div>Loading...</div>
        ) : (
          <form
            encType="multipart/form-data"
            className="mt-3"
          >
            <div className="row ">
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Customer Name <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="customer_name"
                      value={formData.customer_name}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Customer Email <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="customer_email"
                      value={formData.customer_email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Customer Phone <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="customer_phone"
                      value={formData.customer_phone}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Subject <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={formData.subject}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Enquiry Page Url <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="enquiry_page"
                      value={formData.enquiry_page}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Date <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                    //   value={formData.subject}
                      value={new Date(formData.createdAt).toLocaleDateString()}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3 mb-5">
                <div className="row items-center">
                  <div className="col-md-3">
                    <label>
                      Message <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="message"
                      value={formData.message}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </Layout>
  );
};

export default page;
