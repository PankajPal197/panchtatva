import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import Cities from "../Models/Cities";

export const getCity = async () => {
  try {
    await connectDB();
    const data = await Cities.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postCity = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };
    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };
    const cityData = await Cities.create({
      city_name: getText("city_name"),
      page_url: getText("page_url"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
    });

    return NextResponse.json(
      {
        message: "City created and saved successfully",
        success: true,
        cityData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SERVER ERROR:", err); // ✅ fix: log `err` not `error`
    return NextResponse.json(
      {
        message: err.message || "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const putCity = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = formData.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };
    const updateData = {
      city_name: getText("city_name"),
      page_url: getText("page_url"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
    };


    const updated = await Cities.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Updated successfully",
      updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
export const deleteCity = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }   
    const deleted = await Cities.findByIdAndUpdate(
      id,
      { delete_status: "deleted" },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Soft deleted & images removed",
      deleted,
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const restoreCity = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await Cities.findByIdAndUpdate(
      id,
      { delete_status: "active", status: "active" },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Restored successfully",
      restored,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const permanentlyDeleteCity = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    await Cities.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
