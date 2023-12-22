import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const CreateJob = () => {
  const [tabledata, setTableData] = useState([]);
  const [mappedArray, setMapppedArray] = useState([]);

  const handleMap = (id) => {
    setTableData((prev) => [...prev, id]);
    console.log(tabledata);
    setMapppedArray(tabledata);
  };

  const removeClick = () => {
    tabledata.pop();
    setMapppedArray(tabledata);
    console.log(mappedArray, "mapped");
  };

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>New Job</h3>
          <button>All Jobs</button>
        </div>
        <div className="pc3">
          <h4 className="addServiceh4">Customer Details</h4>
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
                  <label> Category</label>
                  <select>
                    <option value="">Select Category</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Select City</label>
                  <select>
                    <option value="">Select City</option>
                    <option value="">Unpublish</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Select HUB</label>
                  <select>
                    <option value="">Select HUB</option>
                    <option value="">Parent C</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Society</label>
                  <input type="text" alt="" placeholder="Society" />
                </div>
                <div className="addService2">
                  <label>Address</label>
                  <input type="text" alt="" placeholder="Address" />
                </div>
                <div className="addService2">
                  <label>Select Source</label>
                  <select>
                    <option value="">Whats app</option>
                    <option value="">LinkedIn</option>
                    <option value="">Parent Cat</option>
                    <option value="">P Category</option>
                  </select>
                </div>
              </div>
              <hr />
              <h4 className="addServiceh4">Cart Details</h4>
              <hr />
              <div className="cjTable">
                <table>
                  <thead>
                    <tr>
                      <th>Service/Package</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappedArray?.map((ele, i) => (
                      <>
                        <tr key={i}>
                          <td>
                            <input
                              type="text"
                              alt=""
                              placeholder="Type or select a service"
                            />
                          </td>
                          <td>0</td>
                          <td>0.00</td>
                          <td>0.00</td>
                          <td>
                            <i
                              class="fa-solid fa-trash"
                              onClick={() => removeClick(i)}
                            ></i>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cj1">
                <div className="cj2">
                  <div className="cjBtn">
                    <button
                      className="cjBtn1"
                      type="button"
                      onClick={() => handleMap(1)}
                    >
                      Add Another Service
                    </button>
                    <button className="cjBtn2">Add Another Package</button>
                  </div>
                  <div className="cj4">
                    <label>Job Date</label>
                    <input type="date" alt="" />
                    <h4 className="cj4h4">Select Slot</h4>
                  </div>
                </div>
                <div className="cj3">
                  <div className="cj5">
                    <hr />
                    <div className="cj6">
                      <h5>Regular / Sale Price</h5>
                      <input type="text" placeholder="0" />
                      <input type="text" placeholder="0" />
                    </div>
                    <hr />
                    <div className="cj7">
                      <h5>Discount</h5>
                      <input type="text" placeholder="0" />
                    </div>
                    <hr />
                    <div className="cj7">
                      <h5>Concession</h5>
                      <input type="text" placeholder="0" />
                    </div>
                    <hr />
                    <div className="cj7">
                      <h5>Convenience</h5>
                      <input type="text" placeholder="0" />
                    </div>
                    <hr />
                    <div className="cj7">
                      <h5>Surge Amount</h5>
                      <input type="text" placeholder="0" />
                    </div>
                    <hr />
                    <div className="cj7">
                      <h5>Total Amount</h5>
                      <input type="text" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <button className="addServiceButton">Create Job</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
