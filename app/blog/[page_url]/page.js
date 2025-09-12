"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcumbs from "@/app/components/breadcumbs/Breadcumbs";
import Layout from "@/app/components/Layout";
import RightSidebar from "@/app/components/RightSidebar";
import { fetchBlog } from "@/app/store/slices/blogSlice";
import Link from "next/link";
import Image from "next/image";

const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};
const Page = () => {
  const { page_url } = useParams();
  const dispatch = useDispatch();
  const { data: blogs, loading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  // console.log(blogs)
  const blog = blogs.find((blog) => blog.page_url === page_url);

  if (!blog) return <div className="p-10 text-red-600">Blog not found</div>;
  return (
    <Layout>
      <Breadcumbs title={blog.blog_name} pageUrl={`blog >> ${blog.page_url}`} />
      <section className="pt-5 pb-5">
        <div className="p-tb-60">
          <div className="row">
            <div className="col-lg-8">
              <div className="image-hover">
                <Image
                  src={blog.blog_image_1}
                  alt={blog.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <h1>{blog.blog_name}</h1>
              {blog.long_description
                ? blog.long_description.replace(/<[^>]*>/g, "") // Remove HTML tags
                : ""}
            </div>
            <div className="col-lg-4">
              <div className="sticky top-0 z-10">
                <RightSidebar />
                <div className="latest-blog">
                  {blogs
                    ?.filter((blog) => blog.status === "active")
                    .slice(0, 6)
                    .map((blog) => (
                      <div key={blog} className="row d-flex align-items-center">
                        {/* Image Section */}
                        <div className="col-md-4 mt-3">
                          <div className="image overflow-hidden rounded-3">
                            <Link href={`/blog/${blog.page_url}`}>
                              <Image
                                src={blog.blog_image_1}
                                alt={blog.blog_name}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="img-fluid w-100 transition-transform duration-500 ease-in-out hover:scale-105"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "12px",
                                  width: "w-full",
                                  height: "auto",
                                }}
                              />
                            </Link>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="col-md-8 mt-3">
                          <div className="content ps-md-4 mt-3 mt-md-0">
                            <Link href={`/blog/${blog.page_url}`}>
                              <h3 className=" mb-3">{blog.blog_name}</h3>
                            </Link>

                            {blog.short_description
                              ? blog.short_description.slice(0, 50) + "..."
                              : blog.short_description}
                            <div className="row text-muted small">
                              <div className="col-6">
                                <i className="bi bi-calendar-event me-1"></i>{" "}
                                {dateFormat(blog.blog_date)}
                              </div>
                              <div className="col-6 text-end">
                                <i className="bi bi-person me-1"></i>{" "}
                                {blog.blog_author}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;
