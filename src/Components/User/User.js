import React, {useState} from "react";
import Navbar from "../Navbar/Navbar";
import AddUser from "./AddUser";
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <AddUser show={show} onHide={()=>setShow(false)} />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Users</h3>
          <button onClick={()=>setShow(true)}>New user</button>
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
                  <th className="th3">User ID</th>
                  <th className="th6">Password</th>
                  <th className="th6">Name</th>
                  <th className="th7">Email</th>
                  <th className="th7">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>1</td>
                  <td>9811124504</td>
                  <td>12345</td>
                  <td>Flyweis Technology</td>
                  <td>abc@gmail.com</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  
                </tr>
                <tr >
                  <td>2</td>
                  <td>9811124504</td>
                  <td>12345</td>
                  <td>Flyweis Technology</td>
                  <td>abc@gmail.com</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  
                </tr>
                <tr className="odd">
                  <td>3</td>
                  <td>9811124504</td>
                  <td>12345</td>
                  <td>Flyweis Technology</td>
                  <td>abc@gmail.com</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  
                </tr>
                <tr>
                  <td>4</td>
                  <td>9811124504</td>
                  <td>12345</td>
                  <td>Flyweis Technology</td>
                  <td>abc@gmail.com</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
                  </td>
                  
                </tr>
                <tr className="odd">
                  <td>5</td>
                  <td>9811124504</td>
                  <td>12345</td>
                  <td>Flyweis Technology</td>
                  <td>abc@gmail.com</td>
                  <td>
                    <span className="badge badge-primary">Active</span>
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

export default User;
