"use client";
import Breadcumbs from "@/app/components/breadcumbs/Breadcumbs";
import Layout from "@/app/components/Layout";
import NewProducts from "@/app/products/NewProducts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { CiStar } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";

export const brand = [
  {
    id: 1,
    name: "Lesh Sensation Wash",
    image: "/slider/slider1.jpg",
    page_url: "lesh-sensation-wash",
    catregoryUrl: "natural-1-mukhi-rudhraksh",
    colors: [
      { name: "Black", code: "black", price: 0 },
      { name: "Red", code: "red", price: 100 },
    ],
    rating: 5,
    stock:50,
    price: 1999,
    status: "active",
    description: "A natural cleanser with mukhi essence.",
  },
  {
    id: 2,
    brand: "Trendyzone",
    name: "Aromatic Body Wash",
    image: "/slider/slider1.jpg",
    pageUrl: "natural-1-mukhi-rudhraksh",
    productUrl: "aromatic-body-wash",
    color: "green",
    rating: 4,
  },
  {
    id: 3,
    brand: "Trendyzone",
    name: "Luxury Face Cream",
    image: "/slider/slider1.jpg",
    pageUrl: "rudhrakhs-mala",
    productUrl: "luxury-face-cream",
    color: "yellow",
    rating: 5,
  },
  {
    id: 4,
    brand: "Trendyzone",
    name: "Organic Hair Oil",
    image: "/slider/slider1.jpg",
    productUrl: "/product/product",
    color: "pink",
    rating: 4,
  },
  {
    id: 5,
    brand: "Trendyzone",
    name: "Glow Night Serum",
    image: "/slider/slider1.jpg",
    productUrl: "/product/product",
    color: "red",
    rating: 5,
  },
  {
    id: 6,
    brand: "test",
    name: "Glow Night Serum",
    image: "/slider/slider1.jpg",
    productUrl: "/product/product",
    rating: 5,
    color: "green",
  },
];

const Page = ({ params }) => {
  const { page_url, catregoryUrl } = use(params);

const product = brand.find(
  (item) => item.page_url === page_url && item.catregoryUrl === catregoryUrl
);

const [quantity, setQuantity] = useState(1);
const [activeTab, setActiveTab] = useState("desc");
const [selectedColor, setSelectedColor] = useState(
  product?.colors?.[0] || null // safe optional chaining
);
const router = useRouter();

if (!product) {
  return <div className="p-10 text-red-600">Product not found.</div>;
}

  const handleAddToCart = () => {
    router.push("/cart");
  };
  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec" && prev > 1) return prev - 1;
      return prev;
    });
  };
  // const totalPrice = product.price * quantity;
  // const totalPrice = (product.price + selectedColor.price) * quantity;
  return (
    <Layout>
      <Breadcumbs
        title={product.name}
        pageUrl={`${page_url} >> ${catregoryUrl}`}
      />
      <section className="mt-3">
        <div className="p-tb-60">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-2">
                  <div className="images">
                    <Image src={product.image} width={100} height={100} className="mt-2" style={{height:"85px", width:"100%"}} />
                    <Image src={product.image} width={100} height={100} className="mt-2" style={{height:"85px", width:"100%"}} />
                    <Image src={product.image} width={100} height={100} className="mt-2" style={{height:"85px", width:"100%"}} />
                    <Image src={product.image} width={100} height={100} className="mt-2" style={{height:"85px", width:"100%"}} />
                  </div>
                </div>
                <div className="col-md-10">
                   <div className="card p-3 shadow rounded mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
                </div>
              </div>
             
            </div>
            <div className="col-md-6">
              <div className="title">
                <h1>{product.name}</h1>
                <hr />
                <span>{product.brand}</span>
                <div className="text-[#92403c] font-medium text-xl">
                  {/* ₹ {totalPrice} */}
                </div>
                <ul className="flex items-center mt-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <li key={i} className="text-yellow-500">
                      <CiStar size={24} />
                    </li>
                  ))}
                </ul>
                <hr />
                {/* color:<strong>{product.color}</strong> */}
                <div className="varient-color-picker flex gap-4 mt-4">
                  {/* {product.colors.map((color, i) => (
                    <label
                      key={i}
                      className={`cursor-pointer flex flex-col items-center`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <input
                        type="radio"
                        name="color"
                        className="hidden"
                        checked={selectedColor.name === color.name}
                        readOnly
                      />
                      <span
                        className={`radio-ring border-2 border-gray-300 ${
                          selectedColor.name === color.name
                            ? "ring-2 ring-red-500  "
                            : ""
                        }`}
                        style={{ backgroundColor: color.code }}
                      ></span>
                      <span className="text-sm mt-1">{color.name}</span>
                    </label>
                  ))} */}
                </div>
                <div className="quantity flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border rounded"
                  />
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-[#92403c] hover:bg-[#f36c69] text-white p-2 shadow rounded mt-3 mb-3 me-3"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
                <button className="bg-[#92403c] hover:bg-[#f36c69] text-white p-2 shadow rounded mt-3 mb-3 ">
                  Buy Now
                </button>
                <hr />
                <div className="flex items-center justify-start text-center">
                  <Link
                    href="#"
                    className="text-decoration-none text-black hover:text-[#f36c69] text-xl"
                  >
                    <CiDeliveryTruck size={24} /> Delivery & Return
                  </Link>
                  <Link
                    href="#"
                    className="text-decoration-none text-black hover:text-[#f36c69] ml-15 text-xl"
                  >
                    <FaShareAlt size={24} /> share
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card p-3">
        <div className="p-tb-60">
          {/* Tabs */}
          <div className="tabs m-3 flex gap-4">
            <button
              onClick={() => setActiveTab("desc")}
              className={`text-xl font-medium ${
                activeTab === "desc" ? "text-[#92403c]" : "text-black"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("additional-info")}
              className={`text-xl font-medium ${
                activeTab === "additional-info"
                  ? "text-[#92403c]"
                  : "text-black"
              }`}
            >
              Additional Information
            </button>
          </div>
          <hr />

          {/* Content */}
          <div className="tabs-desc mt-4">
            {activeTab === "desc" && (
              <div id="desc">
                <h2 className="text-lg font-semibold mb-2">
                  Product Description
                </h2>
                <p className="text-gray-600">
                  This is the product description.
                </p>
              </div>
            )}

            {activeTab === "additional-info" && (
              <div id="additional-info">
                <h2 className="text-lg font-semibold mb-2">Additional Info</h2>
                <p className="text-gray-600">
                  This is where additional product specifications go.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <NewProducts />
    </Layout>
  );
};

export default Page;
