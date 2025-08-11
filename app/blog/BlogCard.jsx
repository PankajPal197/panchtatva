"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { fetchBlog } from "../store/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
const dateFormat=(date)=>{
return new Date(date).toLocaleDateString("en-GB");
}
const BlogCard = () => {
  const dispatch = useDispatch();
  const { data: blogs , loading } = useSelector((state) => state.blog);
   useEffect(() => {
      dispatch(fetchBlog());
    }, [dispatch]);
const teamMembers = blogs.filter((blog) => blog.status === "active" && blog.sort_order === 1);
  if (loading || !teamMembers) return <div>Loading...</div>;

  return (
    <div className="p-tb-60 px-4">
      <div className="title mb-6 text-center">
        <h2 className="text-2xl font-bold mt-3">Our Blog</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  blog">
        {teamMembers.map((member) => (
          <Link href={`/blog/${member.page_url}`}>
            <div key={member.id} className="p-2">
              <div className="group relative bg-white p-2 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden mx-auto">
                  <img
                    src={member.blog_image_1}
                    alt={member.blog_name}
                    className="w-full h-48 object-cover rounded-xl shadow-2xl transform group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xs text-gray-800">{member.blog_name}</h3>
                  <p className="text-sm text-gray-500">
                    {(member.short_description?.split(" ").slice(0, 5).join(" ") || "") + "..."}

                  </p>
                </div>
                <div className="flex items-center justify-between px-3 pt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaRegUserCircle /> {member.blog_author}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <SlCalender /> <MemberDate date={member.date} /> */}
                    <SlCalender /> {dateFormat(member.blog_date)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
