"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import "./contact.min.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/slices/categorySlice";
import { createEnquiry } from "../store/slices/enquirySlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const page = () => {
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

  const { data: categories, loading } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const contact = categories.find(
    (cat) =>
      cat.page_url === "contact_us" ||
      (cat.status === "Active" && cat.sort_order === 1)
  );

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
        router.push("/contact_us");
      } else {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  console.log(contact)
  // if (loading || !contact) return <div>Loading...</div>;

  return (
    <Layout>
      <Breadcumbs title={contact?.category_name} pageUrl={"contact-us"} />
      <section className="contact-add">
        <div className="pl-20 pr-20 pt-10">
          <div className="row">
            <div className="col-md-4 mt-2">
              <div className="card p-3 shadow-2xl rounded-4xl">
                <div className="flex items-center justify-center">
                  <div className="icons me-3">
                    <FaLocationDot size={30} />
                  </div>
                  <div className="details">
                    <span className="font-medium text-2xl">Address</span>
                    <p className="text-xl">Meerut Road Up</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="card p-3 shadow-2xl rounded-4xl">
                <div className="flex items-center justify-center">
                  <div className="icons me-3">
                    <MdEmail size={30} />
                  </div>
                  <div className="details">
                    <span className="font-medium text-2xl">Support Mail</span>
                    <p className="text-xl">Support@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="card p-3 shadow-2xl rounded-4xl">
                <div className="flex items-center justify-center">
                  <div className="icons me-3">
                    <FaPhoneAlt size={30} />
                  </div>
                  <div className="details">
                    <span className="font-medium text-2xl">Quick Contact</span>
                    <p className="text-xl">+91 7878xxxxxx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="enquiry-form mt-3">
        <div className="p-tb-60 mt-3">
          <div className="row">
            <div className="col-lg-6">
              <img src={contact?.image_name_1} alt={contact?.category_name} />
            </div>
            <div className="col-lg-6">
              <form
                className="form-control"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <span className="font-bold text-2xl">
                  {contact?.extra_heading_1}
                </span>
                <div className="row mt-3">
                  <div className="col-md-12 p-2">
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Full Name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 p-2">
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Phone Number"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 p-2">
                    <input
                      type="email"
                      className="form-control p-2"
                      placeholder="Email Address"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 p-2">
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 p-2">
                    <textarea
                      className="form-control p-2"
                      name="message"
                      id="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12 p-2">
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="map mt-3">
        <iframe
          title="template google map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28029.3515899342!2d77.33461101765859!3d28.627066949259932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce55c6a6ec57f%3A0x750f007b7c3d9a2b!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699889101084!5m2!1sen!2sin"
          class="w-100"
          height={570}
        ></iframe>
      </section>
    </Layout>
  );
};

export default page;
