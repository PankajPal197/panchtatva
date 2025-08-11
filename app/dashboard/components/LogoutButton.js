"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/slices/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
