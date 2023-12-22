import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const AddSP = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>New Service Provider</h3>
          <button onClick={() => navigate("/packages")}>All SP</button>
        </div>
        <div className="pc3">
          <h4 className="addServiceh4">Service Provider</h4>
          <hr />
          <div className="addServiceform">
            <form>
              <div className="addService1">
                <div className="addService2">
                  <label>Name</label>
                  <input type="text" alt="" placeholder="Name" />
                </div>
                <div className="addService2">
                  <label>Email ID</label>
                  <input type="email" alt="" placeholder="Email" />
                </div>
                <div className="addService2">
                  <label>Phone No</label>
                  <input type="text" alt="" placeholder="Phone No" />
                </div>
                <div className="addService2">
                  <label>DOB</label>
                  <input type="date" alt="" placeholder="DOB" />
                </div>
                <div className="addService2">
                  <label> Category</label>
                  <select>
                    <option value="">Select Category</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Rating</label>
                  <input type="text" alt="" placeholder="Rating" />
                </div>
                <div className="addService2">
                  <label>Open Booking</label>
                  <input type="text" alt="" placeholder="1" />
                </div>
                <div className="addService2">
                  <label>Status</label>
                  <select>
                    <option value="">Publish</option>
                    <option value="">Unpublish</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>State</label>
                  <select>
                    <option value="">Child Category</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>City</label>
                  <select>
                    <option value="">Service Group</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>

                <div className="addService2">
                  <label>Address</label>
                  <input type="text" alt="" placeholder="Address" />
                </div>

                <div className="addService2">
                  <label>Profile Photo</label>
                  <input type="file" placeholder="Choose file" />
                </div>

                <div className="addService2">
                  <label>User ID</label>
                  <input type="text" alt="" placeholder="User ID" />
                </div>
                <div className="addService2">
                  <label>Password</label>
                  <input type="password" alt="" placeholder="Password" />
                </div>
              </div>
              <button className="addServiceButton">Create SP</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSP;
