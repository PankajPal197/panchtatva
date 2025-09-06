"use client";
import Layout from "../components/Layout";
import {
  deleteItem,
  fetchDeletedData,
  restoreItem,
} from "@/app/store/slices/restoreSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RestoreTable = ({ type }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.restore);

  useEffect(() => {
    dispatch(fetchDeletedData(type));
  }, [type, dispatch]);

  const handleRestore = (id) => {
    dispatch(restoreItem({ type, id }));
  };
  const handlePermanentDelete = (id) => {
    dispatch(deleteItem({ type, id }));
  };
  console.log(data)
  if (loading) return <p>Loading...</p>;
  return (
    <Layout>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-3 capitalize">{type} Restore</h2>
        <div className="table-responsive px-3 py-3">
          <table className="table text-center table-bordered">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">#</th>
                <th className="p-2 border">Name/Title</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id} className="border">
                    <td>{index + 1}</td>
                  <td className="p-2">
                    {item.product_name || item.category_name || item.name}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleRestore(item._id)}
                      className="bg-cyan-500 me-3 text-white px-3 py-1 rounded"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))}
              {data?.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center p-3">
                    No Deleted {type} found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default RestoreTable;
