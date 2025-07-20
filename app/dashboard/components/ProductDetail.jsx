import Link from 'next/link'
import React from 'react'

const ProductDetail = () => {
  return (
    <div>
        <section className="bg-red-300 px-2 py-3 mt-2 shadow-2xl rounded">
            <div className="row items-center">
                <div className="col-md-2">
                    <Link href="./edit-products" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Enter Detail</Link>
                </div>
                <div className="col-md-2">
                    <Link href="./add-section" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Enter More Sections</Link>
                </div>
                <div className="col-md-2">
                    <Link href="./product-image" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Enter Images</Link>
                </div>
                <div className="col-md-2">
                    <Link href="./edit-products" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Enter City Content L1</Link>
                </div>
                <div className="col-md-2">
                    <Link href="./edit-products" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Enter City Content L2</Link>
                </div>
                <div className="col-md-2">
                    <Link href="./edit-products" className="bg-pink-600 px-2 py-2 text-decoration-none text-white text-xl shadow rounded p-2">Link Categories</Link>
                </div>
            </div>

        </section>
    </div>
  )
}

export default ProductDetail