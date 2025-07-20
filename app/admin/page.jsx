"use client";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const assignRole = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("api/assign-role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: Json.stringify({ email, role }),
    });
    const data = await res.json();
    alert(data.message);
  };
  return (
    <div>
      <h1>Admin: Assign Role</h1>
      <input
        placeholder="User Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Role (e.g., admin, editor)"
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={assignRole}>Assign Role</button>
    </div>
  );
};

export default page;
