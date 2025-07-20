import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-3">
      <div className="p-10">
        <div className="row">
          <div className="col-md-3">
            <Image src="/logo.png" alt="footer-logo" width={100} height={50} />
            <p>
              location_onA-1011, Acme Widgets 123 Widget Street Acmeville, AC
              12345 United States of Americ
            </p>
          </div>
          <div className="text-white col-md-3">
            <span>Quick Links</span>
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-white col-md-3">
            <span>Important Links</span>
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-white col-md-3">
            <span>Our Products</span>
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
