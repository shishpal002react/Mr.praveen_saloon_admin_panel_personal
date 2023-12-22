import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddSlot = () => {
  const navigate = useNavigate();

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const [parenetCateory, setParentCategory] = useState([]);
  const getSarchData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/mainCategory/allCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      const data = response.data.data;
      setParentCategory(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSarchData();
  }, []);

  // state data
  const [mainCategory, setMainCategory] = useState("");
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [duration, setDuration] = useState();
  const [jobAcceptance, setJobAcceptance] = useState();

  const postData = async (e) => {
    e.preventDefault();

    const data = {
      mainCategory: mainCategory,
      dateFrom: dateFrom,
      dateTo: dateTo,
      timeFrom: timeFrom,
      timeTo: timeTo,
      selectDuration: duration,
      jobAcceptance: jobAcceptance,
    };

    console.log(data, "category data");

    const formatData = () => {
      setMainCategory("");
      setDateFrom("");
      setDateTo("");
      setTimeFrom("");
      setTimeTo("");
      setDuration("");
      setJobAcceptance("");
    };

    try {
      const response = await axios.post(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/slot",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      console.log(response, "success");
      toast.success("Slot Create  successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      formatData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Slot New</h5>
          <button onClick={() => navigate("/slots")}>All Slots</button>
        </div>
        <div className="pc3">
          <div className="addServiceform">
            <form onSubmit={postData}>
              <div className="addSlot1">
                <div className="addService2">
                  <label>Date From</label>
                  <input
                    type="date"
                    alt=""
                    required
                    placeholder=""
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Date To</label>
                  <input
                    type="date"
                    alt=""
                    required
                    placeholder=""
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Time From</label>
                  <input
                    type="time"
                    alt=""
                    required
                    placeholder=""
                    value={timeFrom}
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Time To</label>
                  <input
                    type="time"
                    alt=""
                    required
                    placeholder=""
                    value={timeTo}
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label> Select Duration</label>
                  <select
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="">Select Duration</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Job Acceptance</label>
                  <input
                    type="text"
                    required
                    value={jobAcceptance}
                    onChange={(e) => setJobAcceptance(e.target.value)}
                    placeholder="Acceptance"
                  />
                </div>
                <div className="addService2">
                  <label>Select Category</label>
                  <select
                    required
                    onChange={(e) => setMainCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {parenetCateory.map((item, i) => (
                      <option key={i} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="addServiceButton" type="submit">
                Create Slot
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSlot;
