"use client";
import Link from "next/link";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "../profile.min.css";
import { useRouter } from "next/navigation";

const Leftside = () => {
      const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <div className="mt-3 wrap-sidebar-account">
      <ul className="my-account-nav">
        <li>
          <Link href="profile" className="my-account-nav-item">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="../profile/my-account-order" className="my-account-nav-item">
            Order
          </Link>
        </li>
        <li>
          <Link href="../profile/my-account-address" className="my-account-nav-item">
            Address{" "}
          </Link>
        </li>
        <li>
          <Link href="../profile/my-account-edit" className="my-account-nav-item">
            Account Detail Edit
          </Link>
        </li>
        <li>
          <Link href="../profile/my-account-wishlist" className="my-account-nav-item">
            Wishlist
          </Link>
        </li>
        {/* <li> */}
          <button
            className="btn btn-danger w-100 mt-3 d-flex justify-content-center align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        {/* </li> */}
      </ul>
    </div>
  );
};

export default Leftside;
