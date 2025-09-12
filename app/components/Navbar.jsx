"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import Topbar from "./topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/slices/categorySlice";

const Navbar = () => {
  const [openDropdown, setOpenDropDown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: menuList } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const topMenus = menuList.filter(
    (m) =>
      m.status === "active" &&
      m.delete_status === "active" &&
      m.sort_order === 1
  );
  const menuWithSubmenus = topMenus.map((item) => {
    const subMenu = menuList
      .filter(
        (m) =>
          m.status === "active" &&
          m.home_status === "active" &&
          m.delete_status === "active" &&
          m.parent_category_id === item._id &&
          m.sort_order > 1
      )
      .sort((a, b) => a.sort_order - b.sort_order);

    return {
      ...item,
      submenu: subMenu,
    };
  });
  return (
    <>
      <header className="header sticky top-0 z-50">
        <div className="row desktop items-center">
          <div className="col-md-2">
            <div className="pl-6">
              <Link href={"/"}>
                <Image
                  src="/logo.png"
                  width={1000}
                  height={1000}
                  alt="logo-img"
                />
              </Link>
            </div>
          </div>
          <div className="col-md-8">
            <ul className="flex items-center justify-center">
              {menuWithSubmenus.map((item, index) => (
                <li
                  className="pt-6 flex items-center me-3"
                  key={index}
                  onMouseEnter={() => setOpenDropDown(index)}
                  onMouseLeave={() => setOpenDropDown(null)}
                >
                  <Link href={`../${item.page_url}`}>{item.category_name}</Link>
                  <div className="pl-1 pt-1 text-white">
                    {item.submenu.length > 0 &&
                      (openDropdown === index ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      ))}
                  </div>

                  {/* dropdown menu  */}
                  {item.submenu.length > 0 && openDropdown === index && (
                    <ul className="fixed top-16 p-1 z-1 w-60 bg-white rounded-sm">
                      {item.submenu.map((sub, subIndex) => (
                        <li className="w-full text-center " key={subIndex}>
                          <Link
                            className="text-black hover:white"
                            href={`/${item.page_url}/${sub.page_url}`}
                          >
                            {sub.category_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <div className="flex items-center justify-evenly">
              <Link href="/wishlist" title="wishlist" className="group">
                <CiHeart className="text-white text-2xl font-bold transition-transform group-hover:rotate-y-180  duration-500" />{" "}
              </Link>
              <Link href="/login" title="My Account" className="group">
                <FaUserAlt className="text-white text-2xl font-bold transition-transform group-hover:rotate-y-180  duration-500" />{" "}
              </Link>
              <Link href="/cart" title="cart" className="group">
                <FaShoppingCart className="text-white text-2xl font-bold transition-transform group-hover:rotate-y-180  duration-500" />{" "}
              </Link>

              {/* <CiSearch /> */}
            </div>
          </div>
        </div>


{/* mobile view  */}
        <div className="d-lg-none p-3 relative">
          <div className="row items-center text-white">
            <div className="col-4">
              {/* Hamburger Menu */}
              <div
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars size={20} />
              </div>

              {/* Sidebar Menu */}
              {isMenuOpen && (
                <div className="fixed top-0 left-0 h-full w-70 bg-[#1a1a1a] z-50 shadow-lg flex flex-col p-4">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <RiCloseFill size={30} className="font-bold" />
                  </button>

                  {/* Logo */}
                  <div className="mb-3">
                    <Image src="/logo.png" width={160} height={60} alt="logo" />
                  </div>

                  {/* Nav Links */}
                  <ul className="space-y-4">
                    {menuWithSubmenus.map((item, index) => (
                      <li
                        key={index}
                        onMouseEnter={() => setOpenDropDown(index)}
                        onMouseLeave={() => setOpenDropDown(null)}
                        className="text-white"
                      >
                        <div className="flex justify-between items-center">
                          <Link href={item.page_url}>{item.category_name}</Link>
                          {item.submenu.length > 0 && (
                            <span>
                              {openDropdown === index ? (
                                <FaChevronUp
                                  size={14}
                                  onClick={() => setOpenDropDown(null)}
                                  className="ml-2"
                                />
                              ) : (
                                <FaChevronDown
                                  size={14}
                                  onClick={() => setOpenDropDown(index)}
                                  className="ml-2"
                                />
                              )}
                            </span>
                          )}
                        </div>

                        {/* Submenu */}
                        {item.submenu.length > 0 && openDropdown === index && (
                          <ul className=" mt-2 space-y-2 ">
                            {item.submenu.map((sub, subIndex) => (
                              <li key={subIndex} className="w-full ">
                                <Link
                                  href={sub.page_url}
                                  className="text-gray-300 hover:text-white"
                                >
                                  {sub.category_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Center Logo in Navbar */}
            <div className="col-3 flex justify-center">
              <Image
                src="/logo.png"
                width={180}
                height={80}
                alt="mobile-logo"
              />
            </div>

            {/* Right Side Icons */}
            <div className="col-5">
              <div className="flex items-center justify-end">
                <Link href="/wishlist" title="wishlist">
                  <CiHeart className="text-white text-2xl font-bold mr-3" />
                </Link>
                <Link href="/login" title="My Account">
                  <FaUserAlt className="text-white text-2xl font-bold mr-3" />
                </Link>
                <Link href="/cart" title="cart">
                  <FaShoppingCart className="text-white text-2xl font-bold mr-3" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </header>
      <Topbar />
    </>
  );
};

export default Navbar;
