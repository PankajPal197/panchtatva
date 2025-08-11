import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import path from "path";
import fs from "fs/promises";
import Blog from "../Models/Blog";

export const getBlog = async () => {
  try {
    await connectDB();
    const data = await Blog.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postBlog = async (req) => {
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
        "blog",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/blog/${fileName}`; // ✅ public path only
    };

    // Get files
    const ImageFile1 = formData.get("blog_image_1");
    const ImageFile2 = formData.get("blog_image_2");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "blog_image_1");
    const imagePath2 = await saveFile(ImageFile2, "blog_image_2");


    // ✅ Create new home page section in DB (image path stored, not file)
    const blogData = await Blog.create({
      blog_name: getText("blog_name"),
      page_url: getText("page_url"),
      blog_date: getText("blog_date"),
      blog_author: getText("blog_author"),
      seo_title: getText("seo_title"),
      seo_description: getText("seo_description"),
      seo_keywords: getText("seo_keywords"),
      short_description: getText("short_description"),
      long_description: getText("long_description"),
      sort_order: Number(getText("sort_order")|| 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by")|| 0),
      blog_image_1: imagePath1,
      blog_image_2: imagePath2,
    });

    return NextResponse.json(
      {
        message: "Blog created and saved successfully",
        success: true,
        blogData,
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

export const putBlog = async (req) => {
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
        "blog",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/blog/${fileName}`; 
    };

    // Get files
    const ImageFile1 = formData.get("blog_image_1");
    const ImageFile2 = formData.get("blog_image_2");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "blog_image_1");
    const imagePath2 = await saveFile(ImageFile2, "blog_image_2");


    const updateData = {
       blog_name: getText("blog_name"),
      page_url: getText("page_url"),
      blog_date: getText("blog_date"),
      blog_author: getText("blog_author"),
      seo_title: getText("seo_title"),
      seo_description: getText("seo_description"),
      seo_keywords: getText("seo_keywords"),
      short_description: getText("short_description"),
      long_description: getText("long_description"),
      sort_order: Number(getText("sort_order")|| 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: Number(getText("delete_by")|| 0),
      blog_image_1: imagePath1,
      blog_image_2: imagePath2,
    };

    if (ImageFile1 && typeof ImageFile1.arrayBuffer === "function") {
      updateData.blog_image_1 = await saveFile(ImageFile1, "blog_image_1");
    }
    if (ImageFile2 && typeof ImageFile2.arrayBuffer === "function") {
      updateData.blog_image_2 = await saveFile(ImageFile2, "blog_image_2");
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Blog Updated successfully",
      updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};



export const deleteBlog = async (req) => {
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
    const doc = await Blog.findById(id);
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
        console.warn("Failed to delete:", fullPath, err.message);
      }
    };

    await deleteFile(doc.image_1_path);
    await deleteFile(doc.image_2_path);

    // ✅ Soft delete in DB
    const deleted = await Blog.findByIdAndUpdate(
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

export const restoreBlog = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await Blog.findByIdAndUpdate(
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

export const permanentlyDeleteBlog = async (req) => {
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
    const doc = await Blog.findById(id);
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

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
