import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import path from "path";
import fs from "fs/promises";
import HomePage from "../Models/HomePage";
import parseParentSectionId from "../helper/parseParentSectionId";
import mongoose from "mongoose";

export const getHomePage = async () => {
  try {
    await connectDB();
    const allSections = await HomePage.find({ delete_status: "active" }).lean();
    const data = allSections.map((item) => {
      if (!item.m_id || item.m_id === 0) {
        return { ...item, parentName: "Parent Root" };
      } else {
        const parent = allSections.find(
          (sec) => String(sec._id) === String(item.m_id)
        );
        return {
          ...item,
          parentName: parent ? parent.section_name : "Unknown",
        };
      }
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postHomePage = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };
    //file to disk
    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "home_section",
        fileName
      );
      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);
      return `/home_section/${fileName}`;
    };

    // Get files
    const ImageFile1 = formData.get("image_1");
    const ImageFile2 = formData.get("image_2");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_1");
    const imagePath2 = await saveFile(ImageFile2, "image_2");
    // Create new home page section in DB (image path stored, not file)
    let parentSectionId;
    try {
      parentSectionId = parseParentSectionId(getText("m_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    const homePageData = await HomePage.create({
      section_name: getText("section_name"),
      m_id: parentSectionId,
      heading_1: getText("heading_1"),
      heading_2: getText("heading_2"),
      heading_3: getText("heading_3"),
      short_content_1: getText("short_content_1"),
      short_content_2: getText("short_content_2"),
      long_content_1: getText("long_content_1"),
      long_content_2: getText("long_content_2"),
      sort_order: Number(getText("sort_order") || 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by") || 0),
      image_1: imagePath1,
      image_2: imagePath2,
    });

    return NextResponse.json(
      {
        message: "Home Section created and saved successfully",
        success: true,
        homePageData,
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

export const putHomePage = async (req) => {
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
        "home_section",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/home_section/${fileName}`; // ✅ public path only
    };

    // Get files
    const ImageFile1 = formData.get("image_1");
    const ImageFile2 = formData.get("image_2");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_1");
    const imagePath2 = await saveFile(ImageFile2, "image_2");

    let parentSectionId;
    try {
      parentSectionId = parseParentSectionId(getText("m_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }

    const updateData = {
      // m_id: Number(getText("m_id") || 0),
      section_name: getText("section_name"),
      m_id: parentSectionId,
      heading_1: getText("heading_1"),
      heading_2: getText("heading_2"),
      heading_3: getText("heading_3"),
      short_content_1: getText("short_content_1"),
      short_content_2: getText("short_content_2"),
      long_content_1: getText("long_content_1"),
      long_content_2: getText("long_content_2"),
      sort_order: Number(getText("sort_order") || 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by") || 0),
      image_1: imagePath1,
      image_2: imagePath2,
    };

    if (ImageFile1 && typeof ImageFile1.arrayBuffer === "function") {
      updateData.image_1 = await saveFile(ImageFile1, "image_1");
    }
    if (ImageFile2 && typeof ImageFile2.arrayBuffer === "function") {
      updateData.image_2 = await saveFile(ImageFile2, "image_2");
    }

    const updated = await HomePage.findByIdAndUpdate(id, updateData, {
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

export const deleteHomePage = async (req) => {
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
    const doc = await HomePage.findById(id);
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

    await deleteFile(doc.image_1_path);
    await deleteFile(doc.image_2_path);

    // ✅ Soft delete in DB
    const deleted = await HomePage.findByIdAndUpdate(
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

export const restoreHomePage = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await HomePage.findByIdAndUpdate(
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

export const permanentlyDeleteHomePage = async (req) => {
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
    const doc = await HomePage.findById(id);
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

    await deleteFile(doc.image_1_path);
    await deleteFile(doc.image_2_path);

    await HomePage.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
