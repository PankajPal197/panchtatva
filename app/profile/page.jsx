"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaSignOutAlt, FaUser } from "react-icons/fa";
import Leftside from "./components/Leftside";
import Layout from "../components/Layout";
import Link from "next/link";

const page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      router.push("/login");
      return;
    }
    if (storedUser.startsWith("{") && storedUser.endsWith("}")) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      router.push("/login");
    }
  }, []);


  if (!user) return null;
  return (
    <Layout>
      <div className="p-tb-60">
        <div className="row mt-3 mb-3">
          <div className="col-lg-3">
            <Leftside />
          </div>
          <div className="col-lg-9">
            <div className="my-account-content">
              <div className="mb-60">
                <div className="h5 mt-3">Hello {user.customer_name}</div>
                <div className="h5 mt-3">Your Email {user.customer_email}</div>
                <p className="mt-3">From your account dashboard you can view your <Link href="my-account-order" className="text-danger fw-medium">Recent Orders</Link> , manage your <Link href="my-account-address" className="text-danger fw-medium ">Shipping and Billing Address</Link>, and <Link href="my-account-edit" className="text-danger fw-medium">Edit Your Password and Account Details</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
