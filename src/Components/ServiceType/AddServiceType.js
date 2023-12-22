import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddServiceType(props) {
  //uiiuhdn
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [parentcat, setParentcat] = useState();
  const [data, setData] = useState([]);
  const [notice, setNotice] = useState();

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";
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
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleAddServices = async (e) => {
    console.log("in golu", name);
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      let val;
      if (status === "Publish") {
        val = true;
      } else {
        val = false;
      }
      formdata.append("notice", notice);
      formdata.append("status", val);

      formdata.append("mainCategoryId", parentcat);
      console.log(formdata, "from data");
      const response = await axios.post(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/serviceTypes",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      console.log(response, "success");
      toast.success("parent category add successful", {
        position: "top-center",
      });
      props.onHide();
      props.getdata();
      // props.setShow(false);
      // props.onHide();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Service Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
              <Form.Label>Select P.Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setParentcat(e.target.value)}
              >
                {data &&
                  data.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Service Type name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Notice</Form.Label>
              <Form.Control
                type="text"
                placeholder="Notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginTop: "20px" }}
            >
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Publish">Publish</option>
                <option>Unpublish</option>
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px", width: "20%" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleAddServices}
              >
                Save Type
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AddServiceType;
