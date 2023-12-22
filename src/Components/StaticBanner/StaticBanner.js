import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import AddStatic from "./AddStatic";

const StaticBanner = () => {
  const [show, setShow] = useState(false);

  //banner
  const [banner, setBanner] = useState([]);
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Banner/all/staticBanner`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      console.log(response.data, "child data");
      setBanner(response.data.data);
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(
        `${Baseurl}api/v1/admin/Banner/deletebanner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      getdata();
      toast("Banner delete successfully", {
        position: "top-right",
      });
    } catch {}
  };

  return (
    <>
      <AddStatic show={show} onHide={() => setShow(false)} getdata={getdata} />
      {/* jgufd */}
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <p style={{ fontSize: "18px", fontWeight: "Bold" }}>Static Banner</p>
          <button onClick={() => setShow(true)}>New Banner</button>
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
                  <th className="th1">Position</th>
                  <th className="th3">Type</th>
                  <th className="th6">Banner</th>
                  <th className="th6">Description</th>
                  <th className="th6">status</th>
                  <th className="th7">Action</th>
                </tr>
              </thead>
              <tbody>
                {banner.length > 0 &&
                  banner.map((item, i) => (
                    <tr className="odd" key={i}>
                      <td>
                        <i
                          class="fa fa-fw fa-arrows-alt ui-sortable-handle icon-rotate"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Grag up or down"
                        ></i>
                      </td>
                      <td>{item?.position}</td>
                      <td>{item?.type}</td>

                      <td>
                        <img src={item.image} className="childImg2" />
                      </td>

                      <td>{item?.desc}</td>
                      <td>{item?.status ? "True" : "False"}</td>
                      <td>
                        <button className="deleteBtn">
                          <i
                            class="fa-solid fa-trash"
                            onClick={() => deleteBanner(item._id)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <div className="pc8">
              <h6>Showing 1 to 9 of 9 entries</h6>
              <ul className="pc9">
                <li>Previous</li>
                <li className="pagiBtn">1</li>
                <li className="pagiBtn">2</li>
                <li className="pagiBtn">3</li>
                <li className="pagiBtn">4</li>
                <li>Next</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticBanner;
