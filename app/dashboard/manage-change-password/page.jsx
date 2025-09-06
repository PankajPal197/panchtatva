import React from "react";
import Layout from "../components/Layout";

const page = () => {
  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500">Change Password</div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>
      <section className="px-3">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Change Password
        </div>
        <form
          //   onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-4"
        >
          <div className="row">
            <div className="col-md-4 mt-3">
              <div className="row items-center">
                <div className="col-md-6">
                  <label>
                    Current Password <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="current_password"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="row items-center">
                <div className="col-md-6">
                  <label>
                    New Password <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="new_password"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="row items-center">
                <div className="col-md-6">
                  <label>
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="c_password"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="px-3 py-2 flex items-center justify-center">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Update
              </button>
            </div>
          </div>
        </form>
        <hr />
      </section>
    </Layout>
  );
};

export default page;
