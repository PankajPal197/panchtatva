import { NextResponse } from "next/server";
import GeneralConfig from "../Models/GeneralConfig";
import connectDB from "../utils/Database";
import path from "path";
import fs from "fs/promises";

export const createGenralConfig = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const getText = (key) => formData.get(key) || null;

    // Save uploaded file to /public/general_config and return file path
    const saveFile = async (file, filenamePrefix) => {
      if (!file || typeof file.arrayBuffer !== "function") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "general_config",
        fileName
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true }); // Ensure folder exists
      await fs.writeFile(uploadPath, buffer);

      return `/general_config/${fileName}`; // public path
    };

    // Get files
    const logoFile = formData.get("header_logo");
    const footerFile = formData.get("footer_logo");
    const favIconFile = formData.get("fav_icon_logo");
    const appleFile = formData.get("apple_icon_logo");

    // Save to disk
    const logoPath = await saveFile(logoFile, "header_logo");
    const footerPath = await saveFile(footerFile, "footer_logo");
    const favIconPath = await saveFile(favIconFile, "favicon");
    const applePath = await saveFile(appleFile, "apple_icon");

    // Prepare the data object
    const configData = {
      website_name: getText("website_name"),
      email_ids: getText("email_ids"),
      phone_no: getText("phone_no"),
      whats_phone_no: getText("whats_phone_no"),
      google_map_url: getText("google_map_url"),
      address_1: getText("address_1"),
      address_2: getText("address_2"),
      facebok_url: getText("facebok_url"),
      linkedin_url: getText("linkedin_url"),
      twitter_url: getText("twitter_url"),
      youtube_url: getText("youtube_url"),
      insta_url: getText("insta_url"),
      home_title: getText("home_title"),
      home_desc: getText("home_desc"),
      home_keyword: getText("home_keyword"),
      xml_cate: getText("xml_cate"),
      xml_city: getText("xml_city"),
      robots: getText("robots"),
    };

    // Conditionally add image paths only if file was uploaded
    if (logoPath) configData.header_logo = logoPath;
    if (footerPath) configData.footer_logo = footerPath;
    if (favIconPath) configData.fav_icon_logo = favIconPath;
    if (applePath) configData.apple_icon_logo = applePath;

    // ✅ Check for existing config
    const existingConfig = await GeneralConfig.findOne();

    let config;

    if (existingConfig) {
      // ✅ Update existing config
      config = await GeneralConfig.findByIdAndUpdate(
        existingConfig._id,
        configData,
        { new: true }
      );
    } else {
      // ✅ Create new config
      config = await GeneralConfig.create(configData);
    }

    return NextResponse.json(
      {
        message: existingConfig
          ? "✅ Configuration updated successfully"
          : "✅ Configuration created successfully",
        success: true,
        config,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      {
        message: error.message || "Server error",
        success: false,
      },
      { status: 500 }
    );
  }
};





export const getGenralConfiguration = async(req)=>{
  try{
    await connectDB();
    const data=await GeneralConfig.find();
    return NextResponse.json({
      success:true,
      status:201,
      data
    })

  }
  catch(err){
    return NextResponse.json({
      message:message.err,
      success:false,
      status:500
    })
  }
}
// export const createGenralConfig = async (req) => {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     const getText = (key) => formData.get(key) || null;

//     // Save uploaded file to /public/uploads and return file path
// const saveFile = async (file, filenamePrefix) => {
//   if (!file || typeof file.arrayBuffer !== "function") return null;

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const ext = file.name.split(".").pop();
//   const fileName = `${filenamePrefix}_${Date.now()}.${ext}`;
//   const uploadPath = path.join(
//     process.cwd(),
//     "public",
//     "general_config",
//     fileName
//   );

//   await fs.writeFile(uploadPath, buffer);
//   return `/general_config/${fileName}`; // public path
// };

// const logoFile = formData.get("header_logo");
// const footerFile = formData.get("footer_logo");
// const favIconFile = formData.get("fav_icon_logo");
// const appleFile = formData.get("apple_icon_logo");

// const logoPath = await saveFile(logoFile, "logo");
// const footerPath = await saveFile(footerFile, "logo");
// const favIconPath = await saveFile(favIconFile, "logo");
// const applePath = await saveFile(appleFile, "logo");

//     const config = await GeneralConfig.create({
//       website_name: getText("website_name"),
//       email_ids: getText("email_ids"),
//       phone_no: getText("phone_no"),
//       whats_phone_no: getText("whats_phone_no"),
//       google_map_url: getText("google_map_url"),
//       address_1: getText("address_1"),
//       address_2: getText("address_2"),
//       facebok_url: getText("facebok_url"),
//       linkedin_url: getText("linkedin_url"),
//       twitter_url: getText("twitter_url"),
//       youtube_url: getText("youtube_url"),
//       insta_url: getText("insta_url"),
//       home_title: getText("home_title"),
//       home_desc: getText("home_desc"),
//       home_keyword: getText("home_keyword"),
//       xml_cate: getText("xml_cate"),
//       xml_city: getText("xml_city"),
//       robots: getText("robots"),
//       header_logo: logoPath,
//       footer_logo: footerPath,
//       fav_icon_logo: favIconPath,
//       apple_icon_logo: applePath,
//     });

//     return NextResponse.json(
//       {
//         message: "✅ General Configuration saved with file",
//         success: true,
//         config,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("SERVER ERROR:", error);
//     return NextResponse.json(
//       {
//         message: error.message,
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// };
