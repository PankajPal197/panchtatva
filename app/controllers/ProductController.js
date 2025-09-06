import { NextResponse } from "next/server";
import connectDB from "../utils/Database";
import Product from "../Models/Product";
import path from "path";
import fs from "fs/promises";
import parseParentSectionId from "../helper/parseParentSectionId";
import Categories from "../Models/Categories";

export const getProduct = async (req) => {
  try {
    await connectDB();
    const products = await Product.find({ delete_status: "active" }).lean();
    const categories = await Categories.find().lean();

    const data = products.map((item) => {
      const category = categories.find(
        (cat) => String(cat._id) === String(item.category_id)
      );
      return {
        ...item,
        categoryName: category ? category.category_name : "Unknown",
      };
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
export const postProduct = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };
    // validate file size and file format
    const validateFile = (file) => {
      if (!file || typeof file.arrayBuffer !== "function")
        return { valid: false, reason: "No file provided", skip: true };

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        return {
          valid: false,
          reason: "Invalid file format. Only JPEG, JPG, PNG, WEBP allowed.",
        };
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        return { valid: false, reason: "File size exceeds 2MB" };
      }

      return { valid: true };
    };

    // save file to disk and return public path
    const saveFile = async (file, filenamePrefix) => {
      const validation = validateFile(file);
      if (validation.skip) return null;
      if (!validation.valid) throw new Error(validation.reason);
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "product",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      try {
        await fs.access(uploadPath);
        console.log(`File already exists: ${fileName}`);
      } catch {
        await fs.writeFile(uploadPath, buffer);
        console.log(`File saved: ${fileName}`);
      }
      return `/product/${fileName}`;
    };
    const imageFields = [
      "image_name_1",
      "image_name_2",
      "image_name_3",
      "image_name_4",
    ];
    const images = {};
    for (const field of imageFields) {
      const file = formData.get(field);
      if (file && typeof file.arrayBuffer === "function") {
        images[field] = await saveFile(file, field);
      }
    }
    let colors = [];
    try {
      const rawColors = getText("color");
      colors =
        typeof rawColors === "string" ? JSON.parse(rawColors) : rawColors;
    } catch (err) {
      colors = [];
    }

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };
    let parentCategoryId;
    try {
      parentCategoryId = parseParentSectionId(getText("category_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    const productData = await Product.create({
      product_name: getText("product_name"),
      category_id: parentCategoryId,
      page_url: getText("page_url"),
      extra_heading_1: getText("extra_heading_1"),
      extra_heading_2: getText("extra_heading_2"),
      extra_heading_3: getText("extra_heading_3"),
      extra_heading_4: getText("extra_heading_4"),
      color: getText("color"),
      price: parseNumber(getText("price"), 1),
      stock: parseNumber(getText("stock")),
      discount: parseNumber(getText("discount")),
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
      ...images,
    });

    return NextResponse.json(
      {
        message: "Product created and saved successfully",
        success: true,
        productData,
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
export const updateProduct = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = formData.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };

    const validateFile = (file) => {
      if (!file || typeof file.arrayBuffer !== "function")
        return { valid: false, reason: "No file provided", skip: true };

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        return {
          valid: false,
          reason: "Invalid file format. Only JPEG, JPG, PNG, WEBP allowed.",
        };
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        return { valid: false, reason: "File size exceeds 2MB" };
      }

      return { valid: true };
    };

    // save file to disk and return public path
    const saveFile = async (file, filenamePrefix) => {
      const validation = validateFile(file);
      if (validation.skip) return null;
      if (!validation.valid) throw new Error(validation.reason);
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "product",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      try {
        await fs.access(uploadPath);
        console.log(`File already exists: ${fileName}`);
      } catch {
        await fs.writeFile(uploadPath, buffer);
        console.log(`File saved: ${fileName}`);
      }
      return `/product/${fileName}`;
    };
    const deleteOldFile = async (filePath) => {
      if (!filePath) return;
      const fullPath = path.join(process.cwd(), "public", filePath);
      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.warn(`Failed to delete old image: ${filePath}`);
      }
    };

    const imageFields = [
      "image_name_1",
      "image_name_2",
      "image_name_3",
      "image_name_4",
    ];
    const images = {};
    for (const field of imageFields) {
      const file = formData.get(field);
      if (file && typeof file.arrayBuffer === "function") {
        validateFile(file);
        if (existingProduct[field]) {
          await deleteOldFile(existingProduct[field]);
        }
        images[field] = await saveFile(file, field);
      } else {
        images[field] = existingProduct[field];
      }
    }

    let colors = [];
    try {
      const rawColors = getText("color"); // input value

      if (typeof rawColors === "string") {
        if (rawColors.trim().startsWith("[")) {
          colors = JSON.parse(rawColors);
        } else if (rawColors.startsWith("#")) {
          colors = [{ hex: rawColors }];
        } else if (rawColors.includes(",")) {
          colors = [{ rgb: rawColors }];
        } else {
          colors = [{ name: rawColors }];
        }
      } else if (Array.isArray(rawColors)) {
        colors = rawColors;
      } else {
        colors = [];
      }
    } catch (err) {
      colors = [];
    }

    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };

    let parentCategoryId;
    try {
      parentCategoryId = parseParentSectionId(getText("category_id"));
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    const updateData = {
      product_name: getText("product_name"),
      category_id: parentCategoryId,
      page_url: getText("page_url"),
      extra_heading_1: getText("extra_heading_1"),
      extra_heading_2: getText("extra_heading_2"),
      extra_heading_3: getText("extra_heading_3"),
      extra_heading_4: getText("extra_heading_4"),
      color: colors,
      price: parseNumber(getText("price"), 1),
      stock: parseNumber(getText("stock")),
      discount: parseNumber(getText("discount")),
      rating: parseNumber(getText("rating")),
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
      ...images,
    };

    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      // runValidators: true,
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
export const deleteProduct = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    const doc = await Product.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }
    const deleted = await Product.findByIdAndUpdate(
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
export const permanentlyDeleteProduct = async (req) => {
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

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const restoreProduct = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    const restored = await Product.findByIdAndUpdate(
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
