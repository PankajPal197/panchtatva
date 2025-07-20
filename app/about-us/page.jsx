import React from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";

const page = () => {
  return (
    <Layout>
      <Breadcumbs title={"About Us"} pageUrl={"about-us"} />
      <section className="text-center">
        <div className="p-tb-60">
          <div className="col-10 m-auto">
            <h1>We are Panchtatva</h1>
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
        </div>
      </section>
      <section className="mt-3">
        <div className="p-tb-60">
          <div className="row items-center">
            <div className="col-md-6">
              <img src="../../slider/slider2.jpg" alt="left-image" />
            </div>
            <div className="col-md-6">
              <h2>Established - 1989</h2>
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
      <section className="bg-red-100 p-3">
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
          <div className="row  quality-meterial">
            <div className="col-md-4 ">
              <div className="icons">Icons</div>
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
            <div className="col-md-4 ">
              <div className="icons">Icons</div>
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
            <div className="col-md-4 ">
              <div className="icons">Icons</div>
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
    </Layout>
  );
};

export default page;
