import Link from 'next/link';
import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    img: "/slider/slider1.jpg",
    desc: "Passionate leader and innovator with a vision for the future.",
    date: "12/03/2024",
    authorName: 'admin',
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

const dateFormat = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const formattedDate = new Date(`${year}-${month}-${day}`);
  const dayNumber = formattedDate.getDate();
  const monthName = formattedDate.toLocaleString('en-US', { month: 'short' });
  const yearNumber = formattedDate.getFullYear();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  return `${dayNumber}${getOrdinal(dayNumber)} ${monthName} ${yearNumber}`;
}

const MemberDate = ({ date }) => (
  <div className='date'>{dateFormat(date)}</div>
);
const BlogCard = () => {
  return (
     <div className='p-tb-60 px-4'>
      <div className='title mb-6 text-center'>
        <h2 className='text-2xl font-bold mt-3'>Our Blog</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  blog'>
        {teamMembers.map((member) => (
        <Link href={`/blog/${member.id}`}>
          <div key={member.id} className="p-2">
            <div className="group relative bg-white p-2 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="relative overflow-hidden mx-auto">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-xl shadow-2xl transform group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xs text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">
                  {member.desc.split(" ").slice(0, 5).join(" ")}...
                </p>
              </div>
              <div className="flex items-center justify-between px-3 pt-2 text-sm text-gray-600">
                <div className='flex items-center gap-1'>
                  <FaRegUserCircle /> {member.authorName}
                </div>
                <div className='flex items-center gap-1'>
                  <SlCalender /> <MemberDate date={member.date} />
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogCard