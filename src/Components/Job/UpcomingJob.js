import React from "react";
import Navbar from "../Navbar/Navbar";

const UpcomingJob = () => {
  return (
    <>
      <Navbar />
      <div className="dash1">
        <h4>Upcoming Jobs ( 12 )</h4>
        <div className="dash2">
          <table className="upJob1">
            <thead>
              <tr>
                <th>Job Id</th>
                <th>SP Name</th>
                <th>Schedule Date & Time</th>
                <th>HUB</th>
                <th>Category</th>
                <th>Customer Details </th>
                <th>Customer Address</th>
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
                <td className="upJob2">
                  <p>26-Jul, 2023</p>
                  <button className="bt3" style={{ width: "120px" }}>
                    16:00 - 16:30
                  </button>
                  <button className="freepedi">Freepedi</button>
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
                <td className="upJob2">
                  <p>26-Jul, 2023</p>
                  <button className="bt3" style={{ width: "120px" }}>
                    16:00 - 16:30
                  </button>
                  <button className="freepedi">Freepedi</button>
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
                <td className="upJob2">
                  <p>26-Jul, 2023</p>
                  <button className="bt3" style={{ width: "120px" }}>
                    16:00 - 16:30
                  </button>
                  <button className="freepedi">Freepedi</button>
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
                <td className="upJob2">
                  <p>26-Jul, 2023</p>
                  <button className="bt3" style={{ width: "120px" }}>
                    16:00 - 16:30
                  </button>
                  <button className="freepedi">Freepedi</button>
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UpcomingJob;
