import React from 'react'

const RightSidebar = () => {
  return (
    <div>
        <form className='form-control p-3 shadow rounded'>
            <div className='font-medium text-2xl'>Enquiry Form</div>
            <div className='row mt-3'>
                <div className='col-md-6 mt-3'>
                    <input type='text' placeholder='Name' className='form-control' name='name' value="" />
                </div>
                <div className='col-md-6 mt-3'>
                    <input type='email' placeholder='Email' className='form-control' name='email' value="" />
                </div>
                <div className='col-md-6 mt-3'>
                    <input type='text' placeholder='Phone' className='form-control' name='phone' value="" />
                </div>
                <div className='col-md-6 mt-3'>
                    <input type='text' placeholder='Subject' className='form-control' name='subject' value="" />
                </div>
                 <div className='col-md-12 mt-3'>
                   <textarea className='form-control' name='message' rows="3">Message</textarea>
                </div>
                <div className='col-12'>
                <button className="btn-submit mt-3">Submit</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default RightSidebar