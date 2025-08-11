import React from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import Link from "next/link";

const page = () => {
  return (
    <Layout>
      <Breadcumbs title="Sitemap" pageUrl="sitemap" />
      <section className="mt-4">
        <div className="p-tb-60">
          <div className="col-10 m-auto">
            <div className="title text-center">
              <h1>Sitemap</h1>
            </div>

            <div className="row mt-3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./">Home</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./about-us">About Us</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./contact-us">Contact Us</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./blog">Blog/</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./privacy-policy">Privacy Policy</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./terms-and-conditions">Terms & Conditons</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./">Refund & Policy</Link></div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3"><Link href="./">Shipping & Return</Link></div>
            </div>
            
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
