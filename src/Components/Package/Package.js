import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Package = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Packages</h3>
          <button onClick={() => navigate("/add-package")}>New Package</button>
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
                  <th className="th2">
                    <i class="fa-solid fa-image"></i>
                  </th>
                  <th className="th3">Type</th>
                  <th className="th3">Title</th>
                  <th className="th4">P. Cat</th>
                  <th className="th6">C. cat</th>
                  <th className="th6">Services</th>
                  <th className="th6">Add-On</th>
                  <th className="th6">Dis.</th>
                  <th className="th6">Price</th>
                  <th className="th6">Timing</th>
                  <th className="th6">Status</th>
                  <th className="th7">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>1</td>
                  <td>
                    <img
                      src="https://www.experts4u.in/admin/uploads/1678600562.webp"
                      className="childImg"
                    />
                  </td>
                  <td>
                    <spam className="serviceProImg" style={{ width: "200%" }}>
                      Fix
                    </spam>
                  </td>
                  <td>Salon Deal</td>
                  <td> Deal Salon at Home</td>
                  <td>Summer Special Package</td>
                  <td>
                    <div className="package1">
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835036.webp"
                          className="packImg"
                        />
                        <p>Power Mask O3+</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664875002.webp"
                          className="packImg"
                        />
                        <p>Full Arms, Half Legs, & Under Arms</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                    </div>
                  </td>
                  <td></td>
                  <td>%</td>
                  <td>90</td>
                  <td>80</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button className="deleteBtn2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <img
                      src="https://www.experts4u.in/admin/uploads/1678600562.webp"
                      className="childImg"
                    />
                  </td>
                  <td>
                    <spam className="serviceProImg" style={{ width: "200%" }}>
                      Fix
                    </spam>
                  </td>
                  <td>Salon Deal</td>
                  <td> Deal Salon at Home</td>
                  <td>Summer Special Package</td>
                  <td>
                    <div className="package1">
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835036.webp"
                          className="packImg"
                        />
                        <p>Power Mask O3+</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664875002.webp"
                          className="packImg"
                        />
                        <p>Full Arms, Half Legs, & Under Arms</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                    </div>
                  </td>
                  <td></td>
                  <td>%</td>
                  <td>90</td>
                  <td>80</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button className="deleteBtn2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr className="odd">
                  <td>3</td>
                  <td>
                    <img
                      src="https://www.experts4u.in/admin/uploads/1678600562.webp"
                      className="childImg"
                    />
                  </td>
                  <td>
                    <spam className="serviceProImg" style={{ width: "200%" }}>
                      Fix
                    </spam>
                  </td>
                  <td>Salon Deal</td>
                  <td> Deal Salon at Home</td>
                  <td>Summer Special Package</td>
                  <td>
                    <div className="package1">
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835036.webp"
                          className="packImg"
                        />
                        <p>Power Mask O3+</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664875002.webp"
                          className="packImg"
                        />
                        <p>Full Arms, Half Legs, & Under Arms</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                    </div>
                  </td>
                  <td></td>
                  <td>%</td>
                  <td>90</td>
                  <td>80</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button className="deleteBtn2">
                      <i class="fa-solid fa-trash"></i>
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
                <li className="pagiBtn">2</li>
                <li className="pagiBtn">3</li>
                <li className="pagiBtn">4</li>
                <li>Next</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Package;
