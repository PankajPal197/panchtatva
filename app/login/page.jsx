"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import AuthButtons from "../components/AuthButtons";
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/profile");
    }
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const url = isLogin
      ? "/api/customer?login=true"
      : "/api/customer?signup=true";
    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage(data.message);
      if (isLogin && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/profile");
      }
    } catch (error) {
      setMessage("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "28rem", borderRadius: "12px" }}
      >
        <div className="text-center">
          {isLogin ? (
            <FaSignInAlt size={50} className="text-primary mb-3" />
          ) : (
            <FaUserPlus size={50} className="text-success mb-3" />
          )}
          <h2 className="fw-bold ">{isLogin ? "Login" : "SignUp"}</h2>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FaUser className="text-primary" />
              </span>
              <input
                type="text"
                placeholder="Name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaEnvelope className="text-success" />
            </span>
            <input
              type="email"
              placeholder="Email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock className="text-danger" />
            </span>
            <input
              type="password"
              placeholder="Password"
              name="customer_password"
              value={formData.customer_password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button
            type="submit"
            className={`btn w-100 ${isLogin ? "btn-primary" : "btn-success"}`}
            disabled={loading}
          >
            {loading ? "processing..." : isLogin ? "Login" : "SingUp"}
          </button>
        </form>
        <p
          className="text-center mt-3 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an Account" : "Already have an account? Login"}
        </p>
      <AuthButtons />

        {message && <p className="text-danger text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default page;
