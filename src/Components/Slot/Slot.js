import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Slot = () => {
  const navigate = useNavigate();

  const [slot, setSlot] = useState([]);
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/slot`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      });
      const data = response.data.data;
      console.log(data, "subcategory data");
      setSlot(data.reverse());
    } catch {}
  };

  //data
  const [parenetCateory, setParentCategory] = useState([]);
  const getSarchData = async () => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
    getSarchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h3>Slots</h3>
          <button onClick={() => navigate("/add-slot")}>New Slot</button>
        </div>
        <div className="pc3">
          <div className="slot1_grid_flex">
            {/* className="scrollBar_slot" */}
            <div className="slot1">
              <select>
                <option>Select category</option>
                {parenetCateory.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="date" />
          </div>

          <hr />
          <div className="slot2">
            <div className="slot9">
              {slot &&
                slot.map((item, i) => (
                  <div className="slot3">
                    <div className="slot4">
                      <h4>
                        {item?.timeFrom} - {item?.timeTo}
                      </h4>
                      <button className="editBtn">
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                    <hr />
                    <div className="slot5">
                      <p>Job Acceptance</p>
                      <h6>{item?.jobAcceptance}</h6>
                    </div>
                    <hr />
                    <div className="slot7">
                      <div className="slot6">
                        <p>Job Booked</p>
                        <h6>{item?.totalBookedUsers}</h6>
                      </div>
                      <div className="slot8">
                        <Container>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="ON/OFF"
                            />
                            {/* <Form.Check
                          disabled
                          type="switch"
                          label="disabled switch"
                          id="disabled-custom-switch"
                        /> */}
                          </Form>
                        </Container>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slot;
