import Link from "next/link";
import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaSlidersH, FaTools, FaUsers } from "react-icons/fa";
import { FaScrewdriverWrench, FaArrowRightFromBracket } from "react-icons/fa6";
import "./style.css";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
// import { IoMdHome } from "react-icons/io";


const Header = () => {
  return (
    <>
      {/* topbar start  */}
      <div className="p-tb-60 ">
        <div className="row align-items-center">
          <div className="col-md-4 mt-2">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={100} height={40} />
            </Link>
          </div>
          <div className="col-md-4 mt-2 text-center">
            <p className="text-red-500 fw-bold">
              Use CTRL + S command to save form data
            </p>
          </div>
          <div className="col-md-4 mt-2 text-right">
           <span className="me-2"> Welcome to UserName</span> <span className="me-2">|</span>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
      {/* topbar start  */}

      <div className="ml-3 mr-3">
        <nav class="navbar fixed top-0 left-0 w-full bg-black text-white shadow z-50">
          <div class="max-w-7xl flex justify-between items-center p-1 ml-3">
            <ul class="flex space-x-6 ">
              <li class=" hover:text-blue-600 cursor-pointer header-dashboard">
                <Link
                  a
                  href="./"
                  className="text-decoration-none d-flex  text-white hover:text-blue-600"
                >
                  <IoMdHome size={20} className="mr-2" /> Dashboard
                </Link>
              </li>

              <li class="relative group d-flex items-center cursor-pointer hover:text-cyan-600 header-dashboard">
                <FaSlidersH size={15} className="mr-2" />
                General Configuration
                <ul
                  class="absolute hidden group-hover:block bg-white top-6 text-black mt-1 rounded shadow"
                  style={{ paddingLeft: 0 }}
                >
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-general-config">
                      General Configuration
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-seo-config">
                      Seo Configuration
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-home-page">
                      Manage Home Page
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-banner">Manage Banner</Link>
                  </li>
                </ul>
              </li>
              <li class="hover:text-cyan-500 relative group d-flex items-center cursor-pointer header-dashboard">
                <FaScrewdriverWrench size={15} className="mr-2" /> Admin
                Management
                <ul
                  class="absolute hidden group-hover:block top-6 bg-white text-black mt-1 rounded shadow"
                  style={{ paddingLeft: 0 }}
                >
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-products">
                      Manage Products{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-categories">
                      Manage Categories{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-blog">Manage Blogs </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-cities">Manage Cities </Link>
                  </li>
                </ul>
              </li>
              <li class="hover:text-cyan-500 relative group d-flex items-center cursor-pointer header-dashboard">
                <FaTools size={15} className="mr-2" />
                Tools
                <ul
                  class="absolute hidden group-hover:block bg-white top-6 text-black mt-1 rounded shadow"
                  style={{ paddingLeft: 0 }}
                >
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-enquiry">Enquiry Logs </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-review">Manage Reviews </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-auto-message">
                      Manage Auto Message{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-chatbot-catelogue">
                      Manage Chatbot Catelogue{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-website-visitor">
                      Website Visitors{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-update-sitemap">
                      Update Sitemap{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-robots">
                      Edit Robots.txt{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="relative group d-flex items-center cursor-pointer hover:text-cyan-500 header-dashboard">
                <FaUsers size={15} className="mr-2" />
                Accounts
                <ul
                  class="absolute hidden group-hover:block bg-white top-6 text-black mt-1 rounded shadow"
                  style={{ paddingLeft: 0 }}
                >
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-account-detail">
                      My Accounts Details{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-access-package">
                      Manage Access Package{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-users">Manage Users </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-chatbot-report">
                      Chat Bot Report{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-webpage-hit">
                      View Web Page Hits{" "}
                    </Link>
                  </li>
                  <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 ">
                    <Link href="/dashboard/manage-change-password">
                      Change Password{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li class=" hover:text-blue-600 d-flex items-center cursor-pointer">
                <FaArrowRightFromBracket size={15} className="mr-2" />
                <LogoutButton />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
