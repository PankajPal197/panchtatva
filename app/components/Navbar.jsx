"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import Topbar from "./topbar/Topbar";
const menu = [
  // {
  //   title: "Home",
  //   link: "/",
  // },
  {
    title: "about",
    link: "/about-us",
  },
  {
    title: "Rudraksha Beads",
    link: "#",
    submenu: [
      {
        title: "Natural 1 Mukhi Rudhraksh",
        pageUrl: "natural-1-mukhi-rudhraksh",
      },
      {
        title: "Natural 2 Mukhi Rudhraksh",
        pageUrl: "natural-2-mukhi-rudhraksh",
      },
      {
        title: "Natural 3 Mukhi Rudhraksh",
        pageUrl: "natural-3-mukhi-rudhraksh",
      },
    ],
  },
  {
    title: "Malaand Rosaries",
    link: "#",
    submenu: [
      {
        title: "Rudhrakhs Mala",
        pageUrl: "rudhrakhs-mala",
      },
      {
        title: "Silver Mala",
        pageUrl: "silver-mala",
      },
      {
        title: "Natural Stone Malas",
        pageUrl: "natural-stone-malas",
      },
    ],
  },
  {
    title: "GemStones",
    link: "#",
    submenu: [
      {
        title: "Natural Peridot Stone",
        pageUrl: "natural-peridot-stone",
      },
      {
        title: "Emerald (Panna)",
        pageUrl: "emerald-panna",
      },
      {
        title: "Navratna Stone Set",
        pageUrl: "navratna-stone-set",
      },
    ],
  },
  {
    title: "Vastu Store",
    link: "#",
    submenu: [
      {
        title: "Shivling",
        pageUrl: "shivling",
      },
      {
        title: "Vastu Ball",
        pageUrl: "vastu-ball",
      },
      {
        title: "Vastu Pyramid",
        pageUrl: "vastu-pyramid",
      },
    ],
  },
  // {
  //   title: "contact",
  //   link: "/contact-us",
  // },
];
const Navbar = () => {
  const [openDropdown, setOpenDropDown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const[query, setQuery] = useState("");
  const[results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    if (searchTerm.length > 1) {
    const dummyProducts = [
      { id: 1, name: "Red Shirt" },
      { id: 2, name: "Blue Jeans" },
      { id: 3, name: "Green Hat" },
    ];
    const filtered = dummyProducts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }
  else{
    setResults([]);
  }
  };

  

  return (
    <>
      <header className="header fixed z-50">
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
            <ul className="flex items-center justify-evenly">
              {menu.map((item, index) => (
                <li
                  className="pt-6 flex items-center"
                  key={index}
                  onMouseEnter={() => setOpenDropDown(index)}
                  onMouseLeave={() => setOpenDropDown(null)}
                >
                  <Link href={item.link}>{item.title}</Link>
                  <div className="pl-1 pt-1 text-white">
                    {item.submenu &&
                      (openDropdown === index ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      ))}
                  </div>

                  {/* dropdown menu  */}
                  {item.submenu && openDropdown === index && (
                    <ul className="fixed top-16 p-1 z-1 w-60 bg-white rounded-sm">
                      {item.submenu.map((sub, subIndex) => (
                        <li className="text-black" key={subIndex}>
                          {/* <Link className="text-black" href={sub.link}> */}
                          <Link className="text-black" href={`/${sub.pageUrl}`}>
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-1">
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
              <button onClick={() => setShowSearch(true)}>
                <CiSearch type="button"  className="text-white text-2xl font-bold" />
              </button>
              {/* <CiSearch /> */}
            </div>
          </div>
        </div>

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
                    {menu.map((item, index) => (
                      <li
                        key={index}
                        onMouseEnter={() => setOpenDropDown(index)}
                        onMouseLeave={() => setOpenDropDown(null)}
                        className="text-white"
                      >
                        <div className="flex justify-between items-center">
                          <Link href={item.link}>{item.title}</Link>
                          {item.submenu && (
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
                        {item.submenu && openDropdown === index && (
                          <ul className=" mt-2 space-y-2">
                            {item.submenu.map((sub, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={sub.link}
                                  className="text-gray-300 hover:text-white"
                                >
                                  {sub.title}
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
            <div className="col-4 flex justify-center">
              <Image
                src="/logo.png"
                width={180}
                height={80}
                alt="mobile-logo"
              />
            </div>

            {/* Right Side Icons */}
            <div className="col-4">
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
          {
            showSearch && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded p-3 z-50">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full p-2 border rounded mb-2"
          />
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.id} className="py-1 hover:text-blue-500 cursor-pointer">
                  {item.name}
                </li>
              ))}
            </ul>
          ) : query.length > 1 ? (
            <p className="text-sm text-gray-500">No results found.</p>
          ) : null}
        </div>
            )
          }
        </div>
      </header>
      <Topbar />
    </>
  );
};

export default Navbar;
