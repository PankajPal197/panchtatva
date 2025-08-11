import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer mt-3">
      <div className="p-tb-60">
        <div className="row mt-3">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <Image src="/logo.png" alt="footer-logo" width={100} height={50} />
            <div className="mt-3">
              <p>
                location_onA-1011, Acme Widgets 123 Widget Street Acmeville, AC
                12345 United States of Americ
              </p>
              <div className="social-link mt-3">
                <ul className="flex items-center justify-evenly">
                  <li>
                    <FaFacebookF />
                  </li>
                  <li>
                    <FaInstagram />
                  </li>
                  <li>
                    <FaXTwitter />
                  </li>
                  <li>
                    <FaYoutube />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-lg-3 col-md-4 col-sm-6 col-12">
            <span className="font-medium text-2xl mb-3">Quick Links</span>
            <ul className="mt-3">
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
                <Link href={"/blog"}>Blog</Link>
              </li>
              <li>
                <Link href={"/sitemap"}>Sitemap</Link>
              </li>
            </ul>
          </div>
          <div className=" col-lg-3 col-md-4 col-sm-6 col-12">
            <span className="text-2xl font-medium mb-3">Important Links</span>
            <ul className="mt-3">
              <li>
                <Link href={"/our-presence"}>Our Presene</Link>
              </li>
              <li>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
              </li>
              <li>
                <Link href={"/refund-policy"}>
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href={"/shipping-return"}>
                  Shipping & Return
                </Link>
              </li>
            </ul>
          </div>
          <div className=" col-lg-3 col-md-4 col-sm-6 col-12">
            <span className="font-medium text-2xl mb-3">Our Products</span>
            <ul className="mt-3">
              <li>
                <Link href={"#"}>Rudrasksha Beads</Link>
              </li>
              <li>
                <Link href={"#"}>Maland Rosaries</Link>
              </li>
              <li>
                <Link href={"#"}>Gem Stones</Link>
              </li>
              <li>
                <Link href={"#"}>Vastu Store</Link>
              </li>
              <li>
                <Link href={"#"}>Natural Malas</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black p-1 mt-2">
        <div className="p-tb-60">
          <p>Copyright &copy; 2025 Panchtatva | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
