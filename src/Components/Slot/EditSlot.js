import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditSlot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainCategory, setMainCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [duration, setDuration] = useState("");
  const [jobAcceptance, setJobAcceptance] = useState("");
  const [getSlot, setSlot] = useState();
  const [status, setStatus] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  useEffect(() => {
    if (getSlot) {
      const dateObject = new Date(getSlot?.dateFrom);
      const dateObject1 = new Date(getSlot?.dateTo);
      if (!isNaN(dateObject.getTime())) {
        const day = dateObject.getDate();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();
        const updateDay = day < 10 ? `0${day}` : day;
        const formattedDate = year + "-" + month + "-" + updateDay;
        setDateFrom(formattedDate);
      }
      if (!isNaN(dateObject1.getTime())) {
        const day = dateObject.getDate();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();
        const updateDay = day < 10 ? `0${day}` : day;
        const formattedDate = year + "-" + month + "-" + updateDay;
        setDateTo(formattedDate);
      }
    }
    setStatus(getSlot?.status);
    setMainCategory(getSlot?.mainCategory);
    setJobAcceptance(getSlot?.jobAcceptance);
    setDuration(getSlot?.selectDuration);
    setTimeTo(getSlot?.timeTo);
    setTimeFrom(getSlot?.timeFrom);
  }, [getSlot]);

  const getSlotData = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/slot/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      });
      const data = response.data.data;
      setSlot(data);
      console.log(data, "slot data");
    } catch (error) {
      console.log(error.message);
    }
  };

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
    getSlotData();
  }, []);

  const postData = async (e) => {
    e.preventDefault();

    const data = {
      status: status,
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
      const response = await axios.put(
        `${Baseurl}api/v1/admin/slot/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      toast.success("Slot Update  successful", {
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
                  <label>Job Status</label>
                  <select
                    as="select"
                    defaultValue={status ? "True" : "False"}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={status ? true : false}>
                      {status ? "True" : "False"}
                    </option>
                    <option value={status ? false : true}>
                      {status ? "False" : "True"}
                    </option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Select Category</label>
                  <select onChange={(e) => setMainCategory(e.target.value)}>
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

export default EditSlot;
