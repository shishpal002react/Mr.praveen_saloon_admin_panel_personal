import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const AddPackage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Package New</h3>
          <button onClick={() => navigate("/packages")}>All Packages</button>
        </div>
        <div className="pc3">
          <h4 className="addServiceh4">Package Details </h4>
          <hr />
          <div className="addServiceform">
            <form>
              <div className="addService1">
                <div className="addService2">
                  <label>Package Title</label>
                  <input type="text" alt="" placeholder="Package Title" />
                </div>
                <div className="addService2">
                  <label>Package Rating</label>
                  <input type="text" alt="" placeholder="Package Rating" />
                </div>
                <div className="addService2">
                  <label>Package Timing</label>
                  <input type="text" alt="" placeholder="Package" />
                </div>
                <div className="addService2">
                  <label>Parent Category</label>
                  <select>
                    <option value="">Parent Category</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Child Category</label>
                  <select>
                    <option value="">Child Category</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Package Image</label>
                  <input type="file" placeholder="Choose file" />
                </div>
                <div className="addService2">
                  <label>Package Type</label>
                  <select>
                    <option value="">Service Group</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Status</label>
                  <select>
                    <option value="">Publish</option>
                    <option value="">Unpublish</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Select Services</label>
                  <select>
                    <option value=""></option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Add-on Services</label>
                  <select>
                    <option value=""></option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Regular Price</label>
                  <input type="text" alt="" placeholder="Regular Price" />
                </div>
                <div className="addService2">
                  <label>Sales Price</label>
                  <input type="text" alt="" placeholder="Sales Price" />
                </div>
                <div className="addService2">
                  <label>Discount</label>
                  <input type="text" alt="" placeholder="Discount" />
                </div>
                <div className="addService2">
                  <label>Payable Amount</label>
                  <input type="text" alt="" placeholder="Payable Amount" />
                </div>
              </div>
              <button className="addServiceButton">Create Package</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPackage;
