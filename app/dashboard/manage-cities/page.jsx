"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  deleteCity,
  fetchCity,
  updateStatus,
  updateSortOrder,
} from "@/app/store/slices/citySlice";
import Swal from "sweetalert2";
import ToggleSwitch from "../components/ToggleSwitch";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const page = () => {
  const [sortOrder, setSortOrder] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: cities, loading } = useSelector((state) => state.city);
  const updateSortOrderStatus = useSelector(
    (state) => state.city.updateSortOrderStatus
  );
  const updateStatusFlag = useSelector((state) => state.city.updateStatus);

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

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
        dispatch(deleteCity(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "City has been soft deleted.", "success");
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire("Error!", "Failed to delete banner.", "error");
          });
      }
    });
  };
  useEffect(() => {
    if (cities?.length) {
      const initialSortOrder = {};
      cities.forEach((item) => {
        initialSortOrder[item._id] = item.sort_order;
      });
      setSortOrder(initialSortOrder);
    }
  }, [cities]);

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

  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">Manage Cities</div>
          <div className="">
            <Link href="manage-cities/add-cities">
              <button className="mt-3 p-3 bg-red-700 text-white font-bold shadow rounded ">
                Add City
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>

      <section>
        <div className="form-title bg-blue-700 text-white text-md  font-medium p-3">
          Cities List
        </div>
        <div className="table-responsive px-3 py-3">
          <table className="table table-bordered text-center border w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th>#</th>
                <th>Cities Name</th>
                <th>Page URL</th>
                <th>Order</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cities?.length > 0 ? (
                cities.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.city_name}</td>
                    <td>{item.page_url}</td>
                    <td>
                      <input
                        type="text"
                        value={sortOrder[item._id] || ""}
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
                        className="text-blue-600 me-3"
                        onClick={() =>
                          router.push(
                            `/dashboard/manage-cities/edit-cities/${item._id}`
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
                  <td colSpan="6" className="text-center py-4">
                    {loading ? "Loading Cities..." : "No cities found."}
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
