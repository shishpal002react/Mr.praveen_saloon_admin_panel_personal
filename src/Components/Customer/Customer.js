import React, {useState} from "react";
import Navbar from "../Navbar/Navbar";
import AddCustomer from "./AddCustomer";
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <AddCustomer show={show} onHide={()=>setShow(false)} />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Customers</h3>
          <button onClick={()=>setShow(true)}>Add Customer</button>
        </div>
        <div className="pc3">
          <div className="pc4">
            <div className="pc5">
              <h6>Show</h6>
              <select>
                <option value="10">10</option>
                <option value="10">25</option>
                <option value="10">50</option>
              </select>
              <h6>entries</h6>
            </div>
            <div className="pc6">
              <h6>Search : </h6>
              <input type="text" placeholder="Search here...." />
            </div>
          </div>
          <div className="pc7">
            <table>
              <thead>
                <tr>
                  <th className="th1">#</th>
                  <th className="th6">Name</th>
                  <th className="th6">Mobile No</th>
                  <th className="th7">Email</th>
                  <th className="th7">Total Jobs</th>
                  <th className="th7">Referel Code</th>
                  <th className="th7">Wallet</th>
                  <th className="th7">Status</th>
                  <th className="th7">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>1</td>
                  <td>PRAKRITI</td>
                  <td>1234567890</td>
                  <td>abc@gmail.com</td>
                  <td>1</td>
                  <td>5LYiUoS8vr</td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  <td>
                    <button className="barsBtn">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                  </td>
                </tr>
                <tr >
                    <td>2</td>
                  <td>PRAKRITI</td>
                  <td>1234567890</td>
                  <td>abc@gmail.com</td>
                  <td>1</td>
                  <td>5LYiUoS8vr</td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  <td>
                    <button className="barsBtn">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                  </td>
                  
                </tr>
                <tr className="odd">
                  <td>3</td>
                  <td>PRAKRITI</td>
                  <td>1234567890</td>
                  <td>abc@gmail.com</td>
                  <td>1</td>
                  <td>5LYiUoS8vr</td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  <td>
                    <button className="barsBtn">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                  </td>
                  
                </tr>
                <tr>
                  <td>4</td>
                  <td>PRAKRITI</td>
                  <td>1234567890</td>
                  <td>abc@gmail.com</td>
                  <td>1</td>
                  <td>5LYiUoS8vr</td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  <td>
                    <button className="barsBtn">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                  </td>
                  
                </tr>
                <tr className="odd">
                  <td>5</td>
                  <td>PRAKRITI</td>
                  <td>1234567890</td>
                  <td>abc@gmail.com</td>
                  <td>1</td>
                  <td>5LYiUoS8vr</td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  <td>
                    <button className="barsBtn">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                  </td>
                </tr>
 
              </tbody>
            </table>
            <div className="pc8">
              <h6>Showing 1 to 9 of 9 entries</h6>
              <ul className="pc9">
                <li>Previous</li>
                <li className="pagiBtn">1</li>
                <li>Next</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
