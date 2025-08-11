import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import Categories from "../Models/Categories";
import path from "path";
import fs from "fs/promises";
import parseParentCategoryId from "../utils/parseParentCategoryId";

export const getCategory = async (req) => {
  try {
    await connectDB();
    const data = await Categories.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
export const postCategory = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };

    // save file to disk and return public path
    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "category",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/category/${fileName}`;
    };
    const ImageFile1 = formData.get("image_name_1");
    const ImageFile2 = formData.get("image_name_2");
    const ImageFile3 = formData.get("image_name_3");
    const ImageFile4 = formData.get("image_name_4");

    const imagePath1 = await saveFile(ImageFile1, "image_name_1");
    const imagePath2 = await saveFile(ImageFile2, "image_name_2");
    const imagePath3 = await saveFile(ImageFile3, "image_name_3");
    const imagePath4 = await saveFile(ImageFile4, "image_name_4");

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };
    // ✅ Fix parent_category_id logic
    let parentCategoryId;
    try {
      parentCategoryId = parseParentCategoryId(getText("parent_category_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    const categoryData = await Categories.create({
      category_name: getText("category_name"),
      parent_category_id: parentCategoryId,
      page_url: getText("page_url"),
      extra_heading_1: getText("extra_heading_1"),
      extra_heading_2: getText("extra_heading_2"),
      extra_heading_3: getText("extra_heading_3"),
      seo_title: getText("seo_title"),
      seo_description: getText("seo_description"),
      seo_keywords: getText("seo_keywords"),
      short_content_1: getText("short_content_1"),
      short_content_2: getText("short_content_2"),
      long_content_1: getText("long_content_1"),
      long_content_2: getText("long_content_2"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
      image_name_1: imagePath1,
      image_name_2: imagePath2,
      image_name_3: imagePath3,
      image_name_4: imagePath4,
    });

    return NextResponse.json(
      {
        message: "Category created and saved successfully",
        success: true,
        categoryData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      {
        message: err.message || "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
export const updateCategory = async (req) => {
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

    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "category",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      return `/category/${fileName}`; // ✅ public path only
    };

    // Get files
    const ImageFile1 = formData.get("image_name_1");
    const ImageFile2 = formData.get("image_name_2");
    const ImageFile3 = formData.get("image_name_3");
    const ImageFile4 = formData.get("image_name_4");
    // Save to disk
    const imagePath1 = await saveFile(ImageFile1, "image_name_1");
    const imagePath2 = await saveFile(ImageFile2, "image_name_2");
    const imagePath3 = await saveFile(ImageFile3, "image_name_3");
    const imagePath4 = await saveFile(ImageFile4, "image_name_4");

     let parentCategoryId;
    try {
      parentCategoryId = parseParentCategoryId(getText("parent_category_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }

    const updateData = {
      category_name: getText("category_name"),
      parent_category_id: parentCategoryId,
      page_url: getText("page_url"),
      extra_heading_1: getText("extra_heading_1"),
      extra_heading_2: getText("extra_heading_2"),
      extra_heading_3: getText("extra_heading_3"),
      seo_title: getText("seo_title"),
      seo_description: getText("seo_description"),
      seo_keywords: getText("seo_keywords"),
      short_content_1: getText("short_content_1"),
      short_content_2: getText("short_content_2"),
      long_content_1: getText("long_content_1"),
      long_content_2: getText("long_content_2"),
      sort_order: parseNumber(getText("sort_order"), 1),
      delete_status: getText("delete_status"),
      status: getText("status"),
      delete_by: parseNumber(getText("delete_by"), 1),
      image_name_1: imagePath1,
      image_name_2: imagePath2,
      image_name_3: imagePath3,
      image_name_4: imagePath4,
    };

    if (ImageFile1 && typeof ImageFile1.arrayBuffer === "function") {
      updateData.image_name_1 = await saveFile(ImageFile1, "image_name_1");
    }
    if (ImageFile2 && typeof ImageFile2.arrayBuffer === "function") {
      updateData.image_name_2 = await saveFile(ImageFile2, "image_name_2");
    }
    if (ImageFile3 && typeof ImageFile3.arrayBuffer === "function") {
      updateData.image_name_3 = await saveFile(ImageFile3, "image_name_3");
    }
    if (ImageFile4 && typeof ImageFile4.arrayBuffer === "function") {
      updateData.image_name_4 = await saveFile(ImageFile4, "image_name_4");
    }

    const updated = await Categories.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Updated successfully",
      updated,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
export const deleteCategory = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    const doc = await Categories.findById(id);
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
        console.log("Deleted file:", fullPath);
      } catch (err) {
        console.warn("ailed to delete:", fullPath, err.message);
      }
    };
    await deleteFile(doc.image_name_path);

    const deleted = await Categories.findByIdAndUpdate(
      id,
      { delete_status: "deleted" },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: " Deleted & images removed",
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
export const permanentlyDeleteCategory = async (req) => {
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
    const doc = await Categories.findById(id);
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

    await Categories.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const restoreCategory = async (req) => {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const restored = await Categories.findByIdAndUpdate(
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
    console.log("error", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
