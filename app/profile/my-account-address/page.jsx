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
              <div className="mb-60 ">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
