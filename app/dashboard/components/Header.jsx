import Link from "next/link";
import React from "react";
// import { IoMdHome } from "react-icons/io";
const Header = () => {
  return (
    <>
    {/* topbar start  */}
      <div className="px-10 py-3 ">
        <div className="row">
          <div className="col-md-4">Logo Image</div>
          <div className="col-md-4">
            <p className="text-red-500 fw-bold">
              Use CTRL + S command to save form data
            </p>
          </div>
          <div className="col-md-4">Welcome to UserName | Current Date</div>
        </div>
      </div>
    {/* topbar start  */}

     <nav class="navbar fixed top-0 left-0 w-full bg-black text-white shadow z-50">
    <div class="max-w-7xl flex justify-between items-center">
      <ul class="flex space-x-6">
        <Link a href="./" className="text-decoration-none text-white hover:text-blue-600"><li class=" hover:text-blue-600  cursor-pointer">Dashboard</li></Link>
        <li class="relative group cursor-pointer">
          <span class="p-2 hover:text-cyan-500">General Configuration</span>
          <ul class="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow" style={{paddingLeft:0}}>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-general-config">General Configuration</Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-seo-config">Seo Configuration</Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-home-page">Manage Home Page</Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-banner">Manage Banner</Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-gallery">Manage Gallery</Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-client">Manage Clients</Link></li>
            
          </ul>
        </li>
        <li class="relative group cursor-pointer">
          <span class="p-2 hover:text-cyan-500">Admin Management</span>
          <ul class="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow" style={{paddingLeft:0}}>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-products">Manage Products </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-categories">Manage Categories </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-blog">Manage Blogs </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-project-image">Manage Project Image </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-cities">Manage Cities </Link></li>
            
          </ul>
        </li>
         <li class="relative group cursor-pointer">
          <span class="p-2 hover:text-cyan-500">Tools</span>
          <ul class="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow" style={{paddingLeft:0}}>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-enquiry">Enquiry Logs </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-review">Manage Reviews </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-auto-message">Manage Auto Message </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-chatbot-catelogue">Manage Chatbot Catelogue </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-website-visitor">Website Visitors </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-update-sitemap">Update Sitemap </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-robots">Edit Robots.txt </Link></li>
            
          </ul>
        </li>
         <li class="relative group cursor-pointer">
          <span class="p-2 hover:text-cyan-500">Accounts</span>
          <ul class="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow" style={{paddingLeft:0}}>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-account-detail">My Accounts Details </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-access-package">Manage Access Package </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-users">Manage Users </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-chatbot-report">Chat Bot Report </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-webpage-hit">View Web Page Hits </Link></li>
            <li class="p-2 font-semibold w-3xs text-blue-600 hover:text-red-500 bg-gray-100 "><Link href="/dashboard/manage-change-password">Change Password </Link></li>
            
          </ul>
        </li>
        <li class=" hover:text-blue-600  cursor-pointer">Logout</li>

      </ul>
    </div>
  </nav>
    </>
  );
};

export default Header;
