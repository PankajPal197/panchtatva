"use client";
import React from "react";
import TopbarButton from "./TopbarButton";
import { CiSearch } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
const Topbar = () => {
  // const [isPaused, setIsPaused] = useState(false);
  return (
    <div className="topbar">
      <div className="p-tb-60">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block mt-3">
            <TopbarButton />
          </div>
          <div className="col-lg-5 col-md-7 col-sm-6 mt-3">
            <div className="relative w-100">
              <input
                type="search"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white p-3 pr-24 rounded-md shadow-2xl"
              />
              <button
                // onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 topbar-btn text-white shadow-2xl flex items-cente transition"
                type="button"
              >
                <CiSearch size={22} className="mr-1" /> Search
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-sm-6 mt-3">
            <div className="flex items-center text-white text-md">
              <div className="phone-icon mr-3 group rotate-313">
                <FaPhoneVolume 
                  size={30}
                  className="text-white text-2xl font-extrabold transition-transform group-hover:rotate-y-180  duration-500"
                />
              </div>
              
              <div className="whatsapp">
                <span className="font-medium ">whatsapp:</span>
                <br />
                <span className="font-bold">(+91)9678451325</span>
              </div>
              <div className="offer-heading">
                {/* <div class="content"> */}
                <marquee
                  behavior="scroll"
                  direction="left"
                  scrollamount="5"
                  onMouseOver={(e) => e.target.stop()}
                  onMouseOut={(e) => e.target.start()}
                >
                  <div className="d-flex items-center">
                    <MdCardGiftcard size={20} /> - free shipping on order $99
                  </div>
                </marquee>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
