"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import { FaTimes } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Link from "next/link";

const page = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Lesh Sensation Wash",
      color: "Red",
      price: 65,
      image: "/slider/slider1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Herbal Face Wash",
      color: "Green",
      price: 150,
      image: "/slider/slider2.jpg",
      quantity: 2,
    },
  ]);

    const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

    const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

    const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <Layout>
      <Breadcumbs title={"Cart"} pageUrl={"cart"} />
      <section>
        <div className="p-tb-60">
          <h1 className="mt-3">Shopping Cart</h1>
          <div className="row mt-3">
            <div className="col-lg-8 mt-2">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr className="text-center">
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td>
                          <div className="flex items-center justify-around gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                            >
                              <FaTimes className="text-red-500 hover:text-red-700 cursor-pointer" />
                            </button>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div >
                              {item.name}
                              <br />
                              <span className="text-sm text-gray-500">
                                Color: {item.color}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">₹{item.price.toFixed(2)}</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => handleDecrease(item.id)}>
                              <CiCircleMinus
                                size={22}
                                className="text-gray-700 hover:text-black"
                              />
                            </button>
                            <input
                              type="text"
                              name="quantity"
                              id="quantity"
                              value={item.quantity}
                              readOnly
                              className="w-10 text-center border rounded"
                            />
                            <button onClick={() => handleIncrease(item.id)}>
                              <CiCirclePlus
                                size={22}
                                className="text-gray-700 hover:text-black"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="p-3">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                    {cartItems.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center p-4">
                          Your cart is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4 mt-2">
              <div className="card shadow-xl rounded p-3">
                <div className="p-tb-60">
                  <div className="font-medium text-xl">Coupon</div>
                  <div className="flex items-center justify-between mt-4">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="form-control w-50"
                    />
                    <button className="bg-[#92403c] hover:bg-[#f36c69] text-white p-2 shadow rounded">
                      Apply Coupon
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-6 mt-3">SubTotal</div>
                    <div className="col-6 mt-3">₹860.00</div>
                    <div className="col-6 mt-3">GST Tax</div>
                    <div className="col-6 mt-3">18%</div>
                    <div className="col-6 mt-3">Grand Total</div>
                    <div className="col-6 mt-3">₹940.00</div>
                  </div>
                  <Link href="./checkout">
                   <button className="bg-[#92403c] hover:bg-[#f36c69] text-white p-2 shadow rounded mt-3 mb-3">
                    Check Out
                  </button>
                  </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
