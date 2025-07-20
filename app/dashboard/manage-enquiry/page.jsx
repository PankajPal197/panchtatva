import React from 'react'
import Layout from '../components/Layout'

const page = () => {
  return (
    <Layout>
        <section className="px-10 py-5">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">
            Manage Enquiries
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>
      <section>
        <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">
          Enquiries List
        </div>
        <div className="table-responsive px-3 py-3">
          <table className="table p-3">
            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Ajay </td>
                <td>ajay@gmail.com</td>
                <td>8989797456</td>
                <td>FRB Cabin </td>
                <td>05 jul,2025 | 1:05 PM
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