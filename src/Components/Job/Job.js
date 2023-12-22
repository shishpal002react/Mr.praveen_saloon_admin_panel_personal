import React from "react";
import Navbar from "../Navbar/Navbar";

const Job = () => {
  return (
    <>
      <Navbar />
      {/* jh */}
      <div className="dash1" style={{ paddingBottom: "40px" }}>
        <h2>Jobs</h2>
        <div className="dash2">
          <div className="dash3">
            <h5>Jobs</h5>
          </div>
          <hr />
          <div className="job1">
            <div className="job2">
              <label>Select Date From</label>
              <input type="date" />
            </div>
            <div className="job2">
              <label>Select Date To</label>
              <input type="date" />
            </div>
            <div className="job2">
              <label>Select City</label>
              <select>
                <option value="">Select City</option>
                <option value="">Delhi</option>
                <option value="">Kolkata</option>
                <option value="">Bangalore</option>
              </select>
            </div>
            <div className="job2">
              <label>Location Type (Hub)</label>
              <select>
                <option value="">Select Hub</option>
                <option value="">Delhi</option>
                <option value="">Kolkata</option>
                <option value="">Bangalore</option>
              </select>
            </div>
            <div className="job2">
              <label>Category</label>
              <select>
                <option value="">Select Category</option>
                <option value="">Delhi</option>
                <option value="">Kolkata</option>
                <option value="">Bangalore</option>
              </select>
            </div>
            <div className="job2">
              <label>Status</label>
              <select>
                <option value="">Select Status</option>
                <option value="">Delhi</option>
                <option value="">Kolkata</option>
                <option value="">Bangalore</option>
              </select>
            </div>
            <div className="job2">
              <label>Order Id</label>
              <input type="text" />
            </div>
            <div className="job2">
              <label>Customer Email Id</label>
              <input type="text" />
            </div>
            <div className="job2">
              <label>Customer Mobile No</label>
              <input type="text" />
            </div>
            <div className="job2">
              <label>Customer Name</label>
              <input type="text" />
            </div>
            <div className="job2">
              <label>SP Mobile No</label>
              <input type="text" />
            </div>
            <div className="job2">
              <label>Coupon Code</label>
              <input type="text" />
            </div>
          </div>
          <div className="job3">
            <button className="jobBt1">
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
            <button className="jobBt1">
              <i class="fa-solid fa-download"></i> Export
            </button>
            <button className="jobBt2">
              <i class="fa-solid fa-broom"></i> Clear
            </button>
          </div>
        </div>
        <div className="dash2" style={{ marginTop: "30px" }}>
          <div className="job4">
            <h3>Total Job:16</h3>
            <button>New Job</button>
          </div>
          <div className="job5">
            <table>
              <thead>
                <tr>
                  <th>Job Id</th>
                  <th>SP Name</th>
                  <th>Schedule Date & Time</th>
                  <th>HUB</th>
                  <th>Category</th>
                  <th>Customer Details </th>
                  <th>Customer Address</th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>1690365038</p>
                    <button className="bt3">open</button>
                  </td>
                  <td>
                    <p>Raj Kumari</p>
                    <p>9560188475</p>
                    <i class="fa-solid fa-phone"></i>
                  </td>
                  <td>
                    <p>26-Jul, 2023</p>
                    <button className="bt3" style={{ width: "100px" }}>
                      16:00 - 16:30
                    </button>
                  </td>
                  <td>
                    <p>Sector 67</p>
                    <h4>Reschedule Count (0)</h4>
                  </td>
                  <td>
                    <button
                      className="bt1"
                      style={{
                        background: "#00a28a",
                        width: "120px",
                        border: "none",
                        height: "30px",
                      }}
                    >
                      Salon at Home
                    </button>
                    <p>(Total Count : 5)</p>
                  </td>
                  <td>
                    <p>Priyanka</p>
                    <p>abc@gmail.com</p>
                    <p>1234567890</p>
                  </td>
                  <td>
                    <p>A-1101, Godrej101, sec 79</p>
                    <h5>,A-1101, Godrej101, sec 79</h5>
                  </td>
                  <td>
                    <button className="bt2">Action</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1690365038</p>
                    <button className="bt3">open</button>
                  </td>
                  <td>
                    <p>Raj Kumari</p>
                    <p>9560188475</p>
                    <i class="fa-solid fa-phone"></i>
                  </td>
                  <td>
                    <p>26-Jul, 2023</p>
                    <button className="bt3" style={{ width: "100px" }}>
                      16:00 - 16:30
                    </button>
                  </td>
                  <td>
                    <p>Sector 67</p>
                    <h4>Reschedule Count (0)</h4>
                  </td>
                  <td>
                    <button
                      className="bt1"
                      style={{
                        background: "#00a28a",
                        width: "120px",
                        border: "none",
                        height: "30px",
                      }}
                    >
                      Salon at Home
                    </button>
                    <p>(Total Count : 5)</p>
                  </td>
                  <td>
                    <p>Priyanka</p>
                    <p>abc@gmail.com</p>
                    <p>1234567890</p>
                  </td>
                  <td>
                    <p>A-1101, Godrej101, sec 79</p>
                    <h5>,A-1101, Godrej101, sec 79</h5>
                  </td>
                  <td>
                    <button className="bt2">Action</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
