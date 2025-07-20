import React from 'react'

const blogData = [
  {
    id: 1,
    name: "John Doe",
    img: "/slider/slider1.jpg",
    desc: "Passionate leader and innovator with a vision for the future.",
    date: "12/03/2024",
    authorName: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    img: "/slider/slider1.jpg",
    desc: "Expert in digital marketing and brand strategies.",
    date: "12/03/2024",
    authorName: 'admin',
  },
  {
    id: 3,
    name: "David Williams",
    img: "/slider/slider1.jpg",
    desc: "Full-stack developer with a love for innovation.",
    date: "12/12/2024",
    authorName: 'admin',
  },
  {
    id: 4,
    name: "Emily Johnson",
    img: "/slider/slider1.jpg",
    desc: "Creating visually stunning and user-friendly designs.",
    date: "02/03/2024",
    authorName: 'admin',
  },
  {
    id: 5,
    name: "Emily Johnson",
    img: "/slider/slider2.jpg",
    desc: "Creating visually stunning and user-friendly designs.",
    date: "02/03/2024",
    authorName: 'admin',
  },
  {
    id: 6,
    name: "Emily Johnson",
    img: "/slider/slider1.jpg",
    desc: "Creating visually stunning and user-friendly designs.",
    date: "02/03/2024",
    authorName: 'admin',
  },
];
const page = ({params}) => {
    const {id}=params;
    const blog=blogData.find((item)=>item.id===parseInt(id))
    if (!blog) return <div>Blog not found</div>;
  return (
     <div className="p-10">
      <h1 className="text-2xl font-bold">{blog.name}</h1>
      <img src={blog.img} alt={blog.name} className="mt-4 w-full max-w-md" />
      <p className="mt-4">{blog.desc}</p>
    </div>
  )
}

export default page