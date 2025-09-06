"use client";
import React from "react";
import TopbarButton from "./TopbarButton";
import { FaPhoneVolume } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import SearchBar from "../SearchBar";
const Topbar = () => {
  return (
    <div className="topbar">
     
      <div className="p-tb-60">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block mt-3">
            <TopbarButton />
          </div>
          <div className="col-lg-5 col-md-7 col-sm-6 mt-3">
           <SearchBar />
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
