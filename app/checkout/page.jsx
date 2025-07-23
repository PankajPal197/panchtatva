import React from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";

const page = () => {
  return (
    <Layout>
      <Breadcumbs title="Checkout" pageUrl="checkout" />
      <section>
        <div className="p-tb-60">
          <h1 className="mt-3 mb-3">Checkout</h1>
          <div className="row">
            <div className="col-md-8 mt-2">
              <form>
                <span>Billing Detail</span>
                <div className="row mt-3">
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <select name="select_state" className="form-select">
                      <option className="form-control" value="">
                        Select State
                      </option>
                      <option className="form-control" value="">
                        Delhi
                      </option>
                      <option className="form-control" value="">
                        Uttar Pradesh
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Town/City"
                      name="city"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Address"
                      name="address_1"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="LandMark Address"
                      name="address_2"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="ZipCode"
                      name="pincode"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="District"
                      name="district"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </form>
              <div className="mt-3 mb-3">
                <input type="checkbox" />{" "}
                <span className="font-medium text-2xl">Same as Shipping</span>
              </div>
              <form>
                <span>Shipping Detail</span>
                <div className="row mt-3">
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <select name="select_state" className="form-select">
                      <option className="form-control" value="">
                        Select State
                      </option>
                      <option className="form-control" value="">
                        Delhi
                      </option>
                      <option className="form-control" value="">
                        Uttar Pradesh
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Town/City"
                      name="city"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="Address"
                      name="address_1"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="LandMark Address"
                      name="address_2"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="ZipCode"
                      name="pincode"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mt-2">
                    <input
                      type="text"
                      placeholder="District"
                      name="district"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 mt-2">
                <div className="sticky top-0 z-10">
                    <div className="card shadow rounded bg-red-200 p-3">
                        <div className="text-center fw-medium text-xl">Your Order Summary</div>
                        <div className="flex items-center justify-between mt-2 border-bottom">
                            <div className="items"><span>test</span><br/>color:red <br /><span>1X</span></div>
                            <div className="items-price">₹860</div>
                        </div>
                        <div className="flex items-center justify-between mt-2 border-bottom">
                            <div className="items"><span>test</span><br/>color:red <br /><span>1X</span></div>
                            <div className="items-price">₹860</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
