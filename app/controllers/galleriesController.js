import { NextResponse } from "next/server";
import Galleries from "../Models/Galleries";
import connectDB from "../utils/Database";
import path from "path";
import fs from "fs/promises";

export const getGallery = async () => {
  try {
    await connectDB();
    const data = await Galleries.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postGallery = async (req) => {
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
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "gallery",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/gallery/${fileName}`; // ✅ public path only
    };
    // Get files
    const ImageFile1 = formData.get("image_name");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_name");

    const bannerData = await Galleries.create({
      gallery_title: getText("gallery_title"),
      sort_order: Number(getText("sort_order")),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by")),
      image_name: imagePath1,
    });

    return NextResponse.json(
      {
        message: "Gallery created and saved successfully",
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

export const putGallery = async (req) => {
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
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "gallery",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/gallery/${fileName}`; // ✅ public path only
    };

    // Get files
    const ImageFile1 = formData.get("image_name");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_name");

    const updateData = {
      gallery_title: getText("gallery_title"),
      sort_order: Number(getText("sort_order")),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by")),
      image_name: imagePath1,
    };

    if (ImageFile1 && typeof ImageFile1.arrayBuffer === "function") {
      updateData.image_name = await saveFile(ImageFile1, "image_name");
    }

    const updated = await Galleries.findByIdAndUpdate(id, updateData, {
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

export const deleteGallery = async (req) => {
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
    const doc = await Galleries.findById(id);
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
    const deleted = await Galleries.findByIdAndUpdate(
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

export const restoreGallery = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await Galleries.findByIdAndUpdate(
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

export const permanentlyDeleteGallery = async (req) => {
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
    const doc = await Galleries.findById(id);
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

    await Galleries.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
