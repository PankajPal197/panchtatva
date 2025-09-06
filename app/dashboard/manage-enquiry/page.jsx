"use client";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteEnquiry, fetchEnquiry } from "@/app/store/slices/enquirySlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: enquiry, loading } = useSelector((state) => state.enquiry);

  useEffect(() => {
    dispatch(fetchEnquiry());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Enquiry!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEnquiry(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Enquiry has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire("Error!", "Failed to delete banner.", "error");
          });
      }
    });
  };

  console.log(enquiry);

  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Manage Enquiries
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>
      <section>
        <div className="form-title bg-blue-700 text-white text-md  font-medium p-3">
          Enquiries List
        </div>
        <div className="table-responsive px-3 py-3">
          <table className="table table-bordered text-center border w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiry?.length > 0 ? (
                enquiry.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.customer_email}</td>
                    <td>{item.customer_phone}</td>
                    <td>{item.subject}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="text-blue-600 me-3"
                        onClick={() =>
                          router.push(
                            `/dashboard/manage-enquiry/edit-enquiry/${item._id}`
                          )
                        }
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center font-medium text-2xl text-danger py-4"
                  >
                    {loading ? "Loading Enquiries..." : "No Enquiries found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default page;
