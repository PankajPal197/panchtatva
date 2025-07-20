import React from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import BlogCard from "./BlogCard";

const page = () => {
  return (
    <Layout>
         <Breadcumbs title={"Blog"} pageUrl={"blog"} />
         <BlogCard />
    </Layout>
    );
};

export default page;
