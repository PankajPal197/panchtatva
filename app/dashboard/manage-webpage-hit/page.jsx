import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
const page = () => {
  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500">
            View Website Hits Stats
          </div>
          <div>
            Filter by Date: <input type="date" className="mx-2" />
          </div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>

      <section className="mt-1 px-3">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Total Records
        </div>
        <div className="table-responsive px-3 py-3">
          <table className="table table-bordered text-center border w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th>#</th>
                <th>Date</th>
                <th>Ip Address</th>
                <th>Hits</th>
                <th>Browser ID</th>
                <th>Page Url</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>55</td>
                <td>Today</td>
                <td>1.117.278.188</td>
                <td className="text-danger fw-bold">1</td>
                <td>50a720a17ebc0bd…</td>
                <td>https://panchtatva/india/noida</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default page;
