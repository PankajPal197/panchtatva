import React from 'react'
import Layout from '../components/Layout'

const page = () => {
  return (
    <Layout>
      <section className="px-20 py-10">
          <form>
            <div className="flex items-center justify-between">
              <div className="text-2xl fw-bold text-gray-500 ">SEO Configuration</div>
              <div className="">
                <button className="mt-3 px-4 py-2 bg-red-700 text-white font-bold ">
                  Save
                </button>
              </div>
            </div>
            <hr className="bg-red-500 w-100" />
            <div className="col-12 form-control">
              <div className="form-title bg-blue-700 text-white text-md  font-medium px-3 py-2">Seo Configuration</div>
              {/* website part  */}
              <div className="row">
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Website Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="website-config"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        State Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="contact-number"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        City Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="city_name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Region Name <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="region_name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        ICBM <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="icbm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Copyright Line <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="copyright_line"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Google Map Short Link <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="google_map_short_link"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Price Range <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="price_range"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Geo Position <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="geo_position"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Geo Laitude <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="geo_laitude"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Geo Longitude <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="geo_longitude"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Rating Value <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="rating_value"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Best Rating <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="best_rating"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Rating Count <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="rating_count"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Pincode <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="pincode"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Open Hours <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                          name="open_hours"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        Heading Script <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                          name="header_script"
                      ></textarea>
                    </div>
                  </div>
                </div>
                  <div className="col-md-6 mt-2">
                  <div className="row items-center">
                    <div className="col-md-3">
                      <label>
                        After Body Script <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                          name="after_body_script"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </form>
        </section>
    </Layout>
  )
}

export default page