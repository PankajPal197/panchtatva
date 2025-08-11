import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import path from "path";
import fs from "fs/promises";
import Banner from "../Models/Banner";

export const getBanner = async () => {
  try {
    await connectDB();
    const data = await Banner.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postBanner = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };

    // ✅ Save file to disk and return public path
    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(process.cwd(), "public", "banner", fileName);

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/banner/${fileName}`; // ✅ public path only
    };
    // Get files
    const ImageFile1 = formData.get("image_name");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_name");

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };

    const bannerData = await Banner.create({
      heading_1: getText("heading_1"),
      heading_2: getText("heading_2"),
      heading_3: getText("heading_3"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
      image_name: imagePath1,
    });

    return NextResponse.json(
      {
        message: "Banner created and saved successfully",
        success: true,
        bannerData,
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

export const putBanner = async (req) => {
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

    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(process.cwd(), "public", "banner", fileName);

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/banner/${fileName}`; // ✅ public path only
    };

    // Get files
    const ImageFile1 = formData.get("image_name");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_name");

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };

    const updateData = {
      heading_1: getText("heading_1"),
      heading_2: getText("heading_2"),
      heading_3: getText("heading_3"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
      image_name: imagePath1,
    };

    if (ImageFile1 && typeof ImageFile1.arrayBuffer === "function") {
      updateData.image_name = await saveFile(ImageFile1, "image_name");
    }

    const updated = await Banner.findByIdAndUpdate(id, updateData, {
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
export const deleteBanner = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // ✅ Fetch document to get image paths before update
    const doc = await Banner.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }

    // ✅ Delete images from disk
    const deleteFile = async (publicPath) => {
      if (!publicPath) return;

      const fullPath = path.join(process.cwd(), "public", publicPath);
      try {
        await fs.unlink(fullPath);
        console.log("Deleted file:", fullPath);
      } catch (err) {
        console.warn("ailed to delete:", fullPath, err.message);
      }
    };

    await deleteFile(doc.image_name_path);
    // ✅ Soft delete in DB
    const deleted = await Banner.findByIdAndUpdate(
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

export const restoreBannner = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await Banner.findByIdAndUpdate(
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

export const permanentlyDeleteBanner = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // Delete images from disk
    const doc = await Banner.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }

    const deleteFile = async (publicPath) => {
      if (!publicPath) return;
      const fullPath = path.join(process.cwd(), "public", publicPath);
      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.warn("⚠️ Couldn't delete file:", fullPath);
      }
    };

    await deleteFile(doc.image_name_path);

    await Banner.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
