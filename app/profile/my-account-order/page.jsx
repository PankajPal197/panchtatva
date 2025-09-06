"use client";
import React from "react";
import Layout from "../../components/Layout";
import Leftside from "../components/Leftside";

import Link from "next/link";
const page = () => {
  return (
    <Layout>
      <div className="p-tb-60">
        <div className="row mt-3 mb-3">
          <div className="col-lg-3">
            <Leftside />
          </div>
          <div className="col-lg-9">
            <div className="my-account-content">
              <div className="mb-60 table-responsive">
                <table className="table table-bordered text-center border w-full">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th>Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#32351</td>
                      <td>25\08\2025</td>
                      <td>on Hold</td>
                      <td>₹500 for 1 Items</td>
                      <td>
                        <Link href="./profile/account-order-detail">
                         <button className="text-red-600 me-3">
                          View
                        </button>
                        </Link>
                       
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
