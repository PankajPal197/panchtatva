import React from 'react'
import Layout from '../components/Layout'
import Link from "next/link";

const page = () => {
  return (
    <Layout>
          <section className="px-10 py-5">
            <div className="flex items-center justify-between">
              <div className="text-2xl fw-bold text-gray-500 ">
                    Manage Gallery
              </div>
              <div className="">
                <Link href="manage-gallery/add-gallery">
                  <button className="mt-3 px-4 py-2 bg-red-700 text-white font-bold ">
                    Add Gallery
                  </button>
                </Link>
              </div>
            </div>
            <hr className="bg-red-500 w-100" />
          </section>
    
          <section>
            <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
              Gallery Image List
            </div>
            <div className="table-responsive px-3 py-3">
              <table className="table p-3">
                <thead>
                  <th>#</th>
                  <th>Gallery Title</th>
                  <th>Gallery Image</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Service Category</td>
                    <td>services</td>
                    <td className="">
                      <input
                        type="text"
                        placeholder="1"
                        className="form-control w-25  text-center"
                        name="order"
                      />
                    </td>
                    <td>
                      <input type="checkbox" placeholder="1" name="order" />
                    </td>
                    <td>
                      <input type="checkbox" placeholder="1" name="order" />
                    </td>
                    <td>edit /dele</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </Layout>
  )
}

export default page