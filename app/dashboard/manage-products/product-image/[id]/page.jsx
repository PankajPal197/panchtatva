"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/dashboard/components/Layout";
import Link from "next/link";
import ProductDetail from "@/app/dashboard/components/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "@/app/store/slices/productSlice";
import {
  fetchImage,
  updateStatus,
  updateSortOrder,
  deleteImage,
} from "@/app/store/slices/imageSlice";
import ToggleSwitch from "@/app/dashboard/components/ToggleSwitch";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const page = () => {
  const dispatch = useDispatch();
  const { data: product } = useSelector((state) => state.product);
  const { data: image, loading } = useSelector((state) => state.image);

  
  const updateSortOrderStatus = useSelector(
    (state) => state.image.updateSortOrderStatus
  );
  const updateStatusFlag = useSelector((state) => state.image.updateStatus);
  const handleStatusChange = (item) => {
    console.log("Clicked toggle for:", item._id);
    const newStatus = item.status === "active" ? "inactive" : "active";
    console.log("Clicked toggle for:", newStatus);

    dispatch(updateStatus({ id: item._id, status: newStatus }));
  };
  useEffect(() => {
    if (updateStatusFlag === "succeeded") {
      Swal.fire({
        icon: "success",
        title: "Status updated!",
        text: "Status updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }, [updateStatusFlag]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this banner!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteImage(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Image has been soft deleted.", "success");
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire("Error!", "Failed to delete banner.", "error");
          });
      }
    });
  };
  const handleSortOrderChange = (e, id) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setSortOrder((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    };
   
  const handleEnterKey = (e, id) => {
    if (e.key === "Enter") {
      const value = parseInt(sortOrder[id], 10);

      if (!isNaN(value)) {
        dispatch(updateSortOrder({ id, sort_order: value }));
      }
    }
  };
  useEffect(() => {
    if (updateSortOrderStatus === "succeeded") {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Sort order updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [updateSortOrderStatus]);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const id = product?.[0]?._id;
  useEffect(() => {
    dispatch(fetchImage());
  }, [dispatch]);
  console.log(id);
  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Edit Product: test
          </div>
          <div className="">
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-product">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Add Service
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>

      <section className="mt-1 px-3">
        <div className="form-title bg-blue-700 text-white text-md  font-medium p-3">
          Image List
        </div>
        <ProductDetail />
        <Link href={`../product-image/${id}/add-image`}>
          <button className="mt-3 p-3 bg-red-700 text-white font-bold shadow rounded">
            Add Image
          </button>
        </Link>

        <div className="table-responsive px-3 py-3">
          <table className="table table-bordered p-3">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th>#</th>
                <th>Image Name</th>
                <th>Image</th>
                <th>Order</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tbody text-center">
              {image?.length > 0 ? (
                image.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.image_title}</td>
                    <td>
                      {item.image_name_1 ? (
                        <img
                          src={item.image_name_1}
                          alt={item.image_title}
                          className="w-20 h-14 object-cover mx-auto rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={updateSortOrderStatus[item._id] || ""}
                        className="w-12 h-8 text-center border bg-amber-100"
                        name="sort_order"
                        onChange={(e) => handleSortOrderChange(e, item._id)}
                        onKeyDown={(e) => handleEnterKey(e, item._id)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </td>
                    <td>
                      <ToggleSwitch
                        checked={item.status === "active"}
                        onToggle={() => handleStatusChange(item)}
                        id={item._id}
                      />
                    </td>
                    <td>
                     
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
                    className="text-center text-danger fw-medium py-4"
                  >
                    {loading ? "Loading Product..." : "No Image found."}
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
