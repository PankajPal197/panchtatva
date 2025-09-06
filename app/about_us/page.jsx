"use client";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCategory } from "../store/slices/categorySlice";
import { SiQualcomm } from "react-icons/si";
import Testimonial from "../testimonial/Testimonial";

const page = () => {
  // const { page_url } = useParams();
  const dispatch = useDispatch();

  const { data: about } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const aboutData = about.find((a) => a.page_url === "about_us");
  console.log(aboutData);
  if (!aboutData)
    return <div className="p-10 text-red-600">Page not found</div>;

  return (
    <Layout>
      <Breadcumbs
        title={aboutData.category_name}
        pageUrl={aboutData.category_name}
      />
      <section className="text-center">
        <div className="p-tb-60">
          <div className="col-10 m-auto">
            <h1>{aboutData.extra_heading_1}</h1>
            <p className="mt-4">
              {aboutData.long_content_1
                ? aboutData.long_content_1.replace(/<[^>]+>/g, "")
                : "No content available"}
            </p>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="p-tb-60">
          <div className="row items-center">
            <div className="col-md-6">
              <img src={aboutData.image_name_1} alt={aboutData.category_name} />
            </div>
            <div className="col-md-6">
              <h2>{aboutData.extra_heading_2}</h2>
              <p className="mt-4">
                {aboutData.long_content_2
                  ? aboutData.long_content_1.replace(/<[^>]+>/g, "")
                  : "No content available"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="p-tb-60">
          <div className="row">
            <div className="col-md-6 mt-3">
              <h2>Our Mission</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="col-md-6 mt-3">
              <img src="../../slider/slider2.jpg" alt="right-image" />
            </div>
            <div className="col-md-6 mt-3">
              <img src="../../slider/slider2.jpg" alt="our-vision" />
            </div>
            <div className="col-md-6 mt-3">
              <h2>Our Vision</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-red-100 p-3 mt-3">
        <div className="p-tb-60">
          <div className="col-10 m-auto text-center">
            <h2>Quality of the Product</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="row  quality-meterial mt-3">
            <div className="col-md-4 shadow p-3">
              <div className="icons flex justify-center items-center"><SiQualcomm size={24}/> </div>
              <div className="heading-title text-xl font-medium ">
                High-Quality Materials1
              </div>
              <div className="content">
                <p>
                  Crafted with precision and excellence, our activewear is
                  meticulously engineered using premium materials to ensure
                  unmatched comfort and durability.
                </p>
              </div>
            </div>
            <div className="col-md-4 shadow p-3">
              <div className="icons flex justify-center items-center"><SiQualcomm size={24}/></div>
              <div className="heading-title text-xl font-medium ">
                High-Quality Materials
              </div>
              <div className="content">
                <p>
                  Crafted with precision and excellence, our activewear is
                  meticulously engineered using premium materials to ensure
                  unmatched comfort and durability.
                </p>
              </div>
            </div>
            <div className="col-md-4 shadow p-3">
              <div className="icons flex justify-center items-center"><SiQualcomm size={24}/></div>
              <div className="heading-title text-xl font-medium ">
                High-Quality Materials
              </div>
              <div className="content">
                <p>
                  Crafted with precision and excellence, our activewear is
                  meticulously engineered using premium materials to ensure
                  unmatched comfort and durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
    </Layout>
  );
};

export default page;
