import React from 'react'
import { FcDataConfiguration } from "react-icons/fc";
import Link from 'next/link';
import Layout from './components/Layout';
const page = ({children}) => {
  return (
    <>
    <Layout>
      <div className='py-10 px-20'>
        <div className='row'>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-general-config" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>General Configuration</h3>
              <div className=''>
                <p>Manage Edit General Configuration</p>
              </div>
            </div>
            </Link>
          </div>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-categories" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>Category Manager</h3>
              <div className=''>
                <p>Manage Add/Edit Categories</p>
              </div>
            </div>
            </Link>
          </div>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-products" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>Product Manager</h3>
              <div className=''>
                <p>Manage Add/Edit Product Detail</p>
              </div>
            </div>
            </Link> 
          </div>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-seo-config" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>Seo Configuration</h3>
              <div className=''>
                <p>Manage Edit Seo Configuration</p>
              </div>
            </div>
            </Link>
          </div>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-order-manage" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>Order Manager</h3>
              <div className=''>
                <p>Manage Edit Your Order</p>
              </div>
            </div>
            </Link>
          </div>
          <div className='col-md-4 mt-3'>
            <Link href="dashboard/manage-enquiry" className='text-decoration-none'>
            <div className='p-3 shadow rounded-2xl flex justify-center flex-col items-center text-black'>
              <FcDataConfiguration size={80} />
              <h3 className='p-3'>Enquiry Manager</h3>
              <div className=''>
                <p>Manage your Enquiries/Leads</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default page