"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NewProducts from "../products/NewProducts";

const page = () => {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Lesh Sensation Wash",
      color: "Red",
      price: 65.0,
      stock: "In Stock",
      image: "/slider/slider1.jpg", // Update with real image
    },
    {
      id: 2,
      name: "Organic Face Scrub",
      color: "Green",
      price: 120.0,
      stock: "Only 2 left",
      image: "/slider/slider2.jpg",
    },
  ]);

  const handleRemove = (id) => {
    const filtered = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(filtered);
  };
  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    router.push("/cart");
  };
  return (
    <Layout>
      <Breadcumbs title={"Wishlist"} pageUrl={"wishlist"} />
      <section>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Stock Status</th>
                  <th className="p-3 border">Add To Cart</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3 border">
                      <div className="flex items-center gap-4 justify-evenly">
                        <FaTimes
                          onClick={() => handleRemove(item.id)}
                          className="text-red-600 cursor-pointer hover:text-red-800"
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          {item.name} <br />
                          <span className="text-sm text-gray-500">
                            Color: {item.color}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 border">₹{item.price.toFixed(2)}</td>
                    <td className="p-3 border"></td>
                    <td className="p-3 border">
                      
                    </td>
                  </tr>
                ))}
                {wishlistItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center">
                      Your wishlist is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="p-tb-60">
            <NewProducts />
        </div>
      </section>
    </Layout>
  );
};

export default page;
