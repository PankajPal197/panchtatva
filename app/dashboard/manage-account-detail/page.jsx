import React from "react";
import Layout from "../components/Layout";

const page = () => {
  return (
    <Layout>
      <section className="px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500">My Account</div>
        </div>
        <hr className="bg-red-500 w-full mt-2" />
      </section>
      <section className="px-3">
        <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Account Details
        </div>
        <form
          //   onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-4"
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    First Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Last Name <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Email Address <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Postal Address <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="type"
                    className="form-control"
                    name="user_address"
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Username <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="type"
                    className="form-control"
                    name="username"
                    readOnly
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Account Created On <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="type"
                    className="form-control"
                    name="createdAt"
                    readOnly
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row items-center">
                <div className="col-md-3">
                  <label>
                    Account Status <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="type"
                    className="form-control"
                    name="status"
                    readOnly
                    // value={formData.blog_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="px-3 py-2 flex items-center justify-center">
              <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded">
                Save
              </button>
            </div>
          </div>
        </form>
        <hr />
        <section className="active-device py-3">
          <h2 className="text-danger fw-medium">Active Device(S)</h2>
          <div className="table-responsive">
            <table className="table-bordered w-full">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th>#</th>
                  <th>Login Date & Time</th>
                  <th>IP Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>15 Aug, 2025 | 01:22 PM</td>
                  <td>103.100.6.52</td>
                  <td>This Device</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="active-device py-3">
          <h2 className="text-danger fw-medium">Last 10 Logins</h2>
          <div className="table-responsive">
            <table className="table-bordered w-full">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th>#</th>
                  <th> Date & Time</th>
                  <th>IP Address</th>
                  <th>Continent</th>
                  <th>Country</th>
                  <th>Region/State</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>15 Aug, 2025 | 01:22 PM</td>
                  <td>103.100.6.52</td>
                  <td>Asia</td>
                  <td>India</td>
                  <td>National Capital Territory of Delhi</td>
                  <td>City</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default page;
