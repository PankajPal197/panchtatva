import React from 'react'

const page = ({params}) => {
    const {id}=params;
    // if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{id}</h1>
      </div>
  )
}

export default page