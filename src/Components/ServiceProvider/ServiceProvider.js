import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// jgu
const ServiceProvider = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Category/getAllCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setProduct(response.data.data);
      console.log(product, "child data");
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? product?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.notice?.toString()?.toLowerCase().includes(query?.toLowerCase())
      )
    : product;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setCurrentPage2(currentPage2 + 1);
  }

  function Prev() {
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Service Providers</h3>
          <button onClick={() => navigate("/add-sp")}>New SP</button>
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
          <div className="sp1">
            <table>
              <thead>
                <tr>
                  <th className="th1">#</th>
                  <th className="th2">
                    <i class="fa-solid fa-image"></i>
                  </th>
                  <th className="th3">User ID</th>
                  <th className="th3">Password</th>
                  <th className="th4">SP Name</th>
                  <th className="th6">Contact No</th>
                  <th className="th6">Email</th>
                  <th className="th6">DOB</th>
                  <th className="th6">Address</th>
                  <th className="th6">Category</th>
                  <th className="th6">Rating</th>
                  <th className="th6">Mult Booking</th>
                  <th className="th6">Status</th>
                  <th className="th7">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>1</td>
                  <td>
                    <spam className="serviceProImg">Image</spam>
                  </td>
                  <td>E4U5410</td>
                  <td>54321@seema</td>
                  <td>Seema</td>
                  <td>7303044675</td>
                  <td>Nomail@gmail.com</td>
                  <td>1995-01-01</td>
                  <td>gurgaon, Gurugram, Haryana</td>
                  <td>Salon at Home</td>
                  <td>4.5</td>
                  <td>1</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <spam className="serviceProImg">Image</spam>
                  </td>
                  <td>E4U5410</td>
                  <td>54321@seema</td>
                  <td>Seema</td>
                  <td>7303044675</td>
                  <td>Nomail@gmail.com</td>
                  <td>1995-01-01</td>
                  <td>gurgaon, Gurugram, Haryana</td>
                  <td>Salon at Home</td>
                  <td>4.5</td>
                  <td>1</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr className="odd">
                  <td>3</td>
                  <td>
                    <spam className="serviceProImg">Image</spam>
                  </td>
                  <td>E4U5410</td>
                  <td>54321@seema</td>
                  <td>Seema</td>
                  <td>7303044675</td>
                  <td>Nomail@gmail.com</td>
                  <td>1995-01-01</td>
                  <td>gurgaon, Gurugram, Haryana</td>
                  <td>Salon at Home</td>
                  <td>4.5</td>
                  <td>1</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <spam className="serviceProImg">Image</spam>
                  </td>
                  <td>E4U5410</td>
                  <td>54321@seema</td>
                  <td>Seema</td>
                  <td>7303044675</td>
                  <td>Nomail@gmail.com</td>
                  <td>1995-01-01</td>
                  <td>gurgaon, Gurugram, Haryana</td>
                  <td>Salon at Home</td>
                  <td>4.5</td>
                  <td>1</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr className="odd">
                  <td>5</td>
                  <td>
                    <spam className="serviceProImg">Image</spam>
                  </td>
                  <td>E4U5410</td>
                  <td>54321@seema</td>
                  <td>Seema</td>
                  <td>7303044675</td>
                  <td>Nomail@gmail.com</td>
                  <td>1995-01-01</td>
                  <td>gurgaon, Gurugram, Haryana</td>
                  <td>Salon at Home</td>
                  <td>4.5</td>
                  <td>1</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
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

export default ServiceProvider;
