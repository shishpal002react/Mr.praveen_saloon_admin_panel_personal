import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Slot = () => {
  const navigate = useNavigate();
  const [switchValue, setSwitchValue] = useState("");
  const [id, setId] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");

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

  useEffect(() => {
    const setStatusSlot = async () => {
      const data = {
        mainCategory: mainCategoryId,
        status: switchValue,
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
        getdata();
      } catch (e) {
        console.log(e);
      }
    };
    setStatusSlot();
  }, [switchValue, id]);

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Slots</h5>
          <button onClick={() => navigate("/add-slot")}>New Slot</button>
        </div>
        <div className="pc3">
          <div className="slot1_grid_flex">
            <div className="slot_button">
              <select>
                <option>Select category</option>
                {parenetCateory.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="slot_button">
              <input style={{ padding: "5px" }} type="date" />
            </div>
          </div>

          <hr />
          <div className="slot2">
            <div className="slot9">
              {slot &&
                slot.map((item, i) => (
                  <div className="slot3">
                    <div className="slot4">
                      <h6>
                        {item?.timeFrom} - {item?.timeTo}
                      </h6>
                      <button className="editBtn">
                        <i
                          onClick={() =>
                            navigate(`/slots/editSlot/${item._id}`)
                          }
                          class="fa fa-edit"
                        ></i>
                      </button>
                    </div>
                    <hr />
                    <div className="slot5">
                      <h6>Job Acceptance</h6>
                      <h6>{item?.jobAcceptance}</h6>
                    </div>
                    <hr />
                    <div className="slot7">
                      <div className="slot6">
                        <h6>Job Booked</h6>
                        <h6>{item?.totalBookedUsers}</h6>
                      </div>
                      <div className="slot8">
                        <Container>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="ON/OFF"
                              checked={item?.status}
                              onChange={() => {
                                setSwitchValue(!switchValue);
                                setId(item?._id);
                                setMainCategoryId(item?.mainCategory);
                              }}
                            />
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
