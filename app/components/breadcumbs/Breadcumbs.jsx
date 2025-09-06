import React from "react";
import "./breadcumbs.min.css";
import Link from "next/link";

const Breadcumbs = ({ title, subCategory, pageUrl }) => {
  
  return (
    <section className="breadcumbs">
      <div className="flex items-center justify-between p-tb-60">
        <div className="title">
          <span className="font-medium text-xl">{title}</span>
        </div>
        <div className="breadcumbs-inner">
          <ul className="flex items-center ">
            <li className="m-3">
              <Link href={"/"}>Home</Link>
            </li>
            {subCategory && (
              <li className="m-3">
                <Link href="/subcategory">{subCategory}</Link>
              </li>
            )}
            <li>{pageUrl}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcumbs;
