import React from 'react'
import Layout from '../components/Layout'
import Breadcumbs from '../components/breadcumbs/breadcumbs'

const page = () => {
  return (
    <Layout>
      <Breadcumbs title={'Conatct Us'} pageUrl={'contact-us'}/>
      <section className='contact-add'>
        <div className="pl-20 pr-20 pt-10">
          <div className='row'>
            <div className='col-md-4'>
              <div className='card p-3 shadow-2xl rounded-4xl'>
                <div className='flex items-center justify-evenly'>
                  <div className='icons'>
                    location
                  </div>
                  <div className='details'>
                    <span className='font-bold'>Address</span>
                    <p>Meerut Road Up</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
            <div className='card p-3 shadow-2xl rounded-4xl'>
                <div className='flex items-center justify-evenly'>
                  <div className='icons m-2'>
                    Mail
                  </div>
                  <div className='details'>
                    <span className='font-bold'>Support Mail</span>
                    <p>Support@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
            <div className='card p-3 shadow-2xl rounded-4xl'>
                <div className='flex items-center justify-evenly'>
                  <div className='icons m-2'>
                    Contact Detail
                  </div>
                  <div className='details'>
                    <span className='font-bold'>Quick Contact</span>
                    <p>+91 7878xxxxxx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='enquiry-form'>
        <div className='p-tb-60 mt-3'>
          <div className='row'>
            <div className='col-md-6'>
              <img src='../../slider/slider2.jpg' alt='contact-image'/>
            </div>
            <div className='col-md-6'>
              <form className='form-control'>
                <span className='font-bold text-2xl'>Leave as Message</span>
                <div className='row'>
                  <div className='col-md-6 p-2'>
                    <input type='text' className='form-control p-2' placeholder='Full Name' /> 
                  </div>
                  <div className='col-md-6 p-2'>
                    <input type='text' className='form-control p-2' placeholder='Phone Number' /> 
                  </div>
                  <div className='col-md-6 p-2'>
                    <input type='email' className='form-control p-2' placeholder='Email Address' /> 
                  </div>
                  <div className='col-md-12 p-2'>
                  <label for="message" class="form-label">Example textarea</label>
                    <textarea className='form-control' id='message' rows="3"></textarea>
                  </div>
                  <div className='col-md-12 p-2'>
                    <button type='submit' className='form-control  bg-red-500'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className='map mt-3'>
      <iframe title="template google map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28029.3515899342!2d77.33461101765859!3d28.627066949259932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce55c6a6ec57f%3A0x750f007b7c3d9a2b!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699889101084!5m2!1sen!2sin"
                    class="w-100" height={570}></iframe>
      </section>
    </Layout>
  )
}

export default page