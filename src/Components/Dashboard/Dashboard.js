import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: "Jiya Bag",
      job: "36",
      revenue: "37301",
      escalation: "0",
      rating: "5",
    },
    {
      name: "Meenakshi",
      job: "16",
      revenue: "37851",
      escalation: "0",
      rating: "5",
    },
    {
      name: "Pushpanjali",
      job: "36",
      revenue: "37301",
      escalation: "0",
      rating: "5",
    },
    {
      name: "Supriya Thapa",
      job: "86",
      revenue: "57301",
      escalation: "4",
      rating: "4",
    },
  ];

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";
  const [parentCategory, setParentCategory] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/mainCategory/allCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      setParentCategory(data);
      console.log(response.data.data, "category data");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dash1">
        <h2>Hi, Flyweis Technology, Welcome to Expert4u</h2>
        <div className="dash2">
          <div className="dash3">
            <h5>Common Statistics</h5>
            <div className="dash4">
              <select>
                <option>All Category </option>
                {parentCategory.length > 0 &&
                  parentCategory.map((item, i) => (
                    <option key={i}>{item.name}</option>
                  ))}
              </select>
              <select>
                <option>Select Year</option>
              </select>
              <select>
                <option>Select Month</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="dash5">
            <div className="dash6">
              <div className="dash7" onClick={() => navigate("/job")}>
                <p>Today's Job</p>
                <h5>11</h5>
              </div>
              <div
                className="dash7 cardCol1"
                onClick={() => navigate("/upcoming-job")}
              >
                <p>Upcoming Jobs</p>
                <h5>8</h5>
              </div>
              <div className="dash7 cardCol2">
                <p>Closed Jobs</p>
                <h5>362</h5>
              </div>
              <div
                className="dash7 cardCol3"
                onClick={() => navigate("/cancelled-job")}
              >
                <p>Canceled Jobs</p>
                <h5>28</h5>
              </div>
              <div className="dash7 cardCol3">
                <p>Escalation Jobs</p>
                <h5>0</h5>
              </div>
              <div className="dash7 cardCol4">
                <p>Total Revenue</p>
                <h5>28</h5>
              </div>
              <div className="dash7">
                <p>Avg. Ticket Size</p>
                <h5>11</h5>
              </div>
              <div className="dash7">
                <p>Total SP</p>
                <h5>11</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="dash2">
          <div className="dash3">
            <h5>Common Statistics</h5>
            <div className="dash4">
              <select>
                <option>All Category </option>
                {parentCategory.length > 0 &&
                  parentCategory.map((item, i) => (
                    <option key={i}>{item.name}</option>
                  ))}
              </select>

              <select>
                <option>Select Year</option>
              </select>
              <select>
                <option>Select Month</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="dash8">
            <table>
              <thead>
                <tr>
                  <th>SP Name</th>
                  <th>Jobs</th>
                  <th>Revenue</th>
                  <th>Escalation</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele, i) => (
                  <>
                    <tr>
                      <td>{ele?.name}</td>
                      <td>{ele?.job}</td>
                      <td>{ele?.revenue}</td>
                      <td>{ele?.escalation}</td>
                      <td>{ele?.rating}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
