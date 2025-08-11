"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralConfig, createGeneralConfig ,} from "@/app/store/slices/genralConfigSlice";


export default function ManageGeneralConfig() { 
  const dispatch = useDispatch();

  const { generalConfig, status, error } = useSelector((state) => state.generalConfig);

  const [formData, setFormData] = useState({
    website_name: "",
    email: "",
    contact_number: "",
    whatsapp_number: "",
    google_map_url: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    youtube_url: "",
    linkedin_url: "",
    address: "",
    office_address: "",
    logo: "",
  });

  // 🟡 Fetch data on mount
  useEffect(() => {
    dispatch(fetchGeneralConfig());
  }, [dispatch]);

  // 🟢 Set form data when fetched from Redux
  useEffect(() => {
    console.log("🟢 generalConfig from Redux:", generalConfig);

    if (generalConfig) {
      setFormData((prev) => ({
        ...prev,
        website_name: generalConfig.website_name || "",
        email: generalConfig.email || "",
        contact_number: generalConfig.contact_number || "",
        whatsapp_number: generalConfig.whatsapp_number || "",
        google_map_url: generalConfig.google_map_url || "",
        facebook_url: generalConfig.facebook_url || "",
        instagram_url: generalConfig.instagram_url || "",
        twitter_url: generalConfig.twitter_url || "",
        youtube_url: generalConfig.youtube_url || "",
        linkedin_url: generalConfig.linkedin_url || "",
        address: generalConfig.address || "",
        office_address: generalConfig.office_address || "",
        logo: generalConfig.logo || "",
      }));
    }
  }, [generalConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>General Config Form</h1>

      {/* 🔍 DEBUG OUTPUT */}
      <div className="bg-gray-100 p-2 mb-4 rounded">
        <h2>🧪 Debug Info:</h2>
        <pre>Status: {status}</pre>
        <pre>Error: {error || "None"}</pre>
        <pre>Form Data: {JSON.stringify(formData, null, 2)}</pre>
      </div>

      <form>
        <div>
          <label>Website Name</label>
          <input
            type="text"
            name="website_name"
            value={formData.website_name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        {/* Add more fields the same way... */}
      </form>
    </div>
  );
}