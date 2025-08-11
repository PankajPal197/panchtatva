"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "../store/slices/authSlice";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, loading, error } = useSelector((state) => state.auth);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(form));
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await dispatch(loginUser(form));

  if (loginUser.fulfilled.match(result)) {
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Redirecting to dashboard...",
      timer: 2000,
      showConfirmButton: false,
    });

    // Redirect after delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.payload || "Invalid email or password.",
    });
  }
};

  useEffect(() => {
    if (token && user) {
      router.push("/dashboard");
    }
  }, [token, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="email"
            className="form-control mt-3"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mt-3"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
