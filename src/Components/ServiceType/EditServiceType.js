import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function EditServiceType(props) {
  //jhhdd
  const namep = props.name;
  const statusp = props.status;
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [commingSoon, setCommingSoon] = useState();
  const [id, setId] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setName(namep);
    setStatus(statusp);
    setId(props.id);
    setCommingSoon(props.commingSoon);
    setMainCategoryId(props.MainCategoryId);
  }, [props]);

  // setName(props.name);
  // setStatus(props.status);
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

  const handleEditServices = async (e) => {
    console.log("in golu", name);
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("status", status);
      formdata.append("mainCategoryId", mainCategoryId);
      console.log(formdata, "from data");
      const response = await axios.put(
        `https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/serviceTypes/${id}`,
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
      toast.success("Service type is Updated successful", {
        position: toast.POSITION.TOP_CENTER,
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
            Service Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
              <Form.Label>Select P.Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setMainCategoryId(e.target.value)}
              >
                {data &&
                  data.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Notice</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={commingSoon}
                onChange={(e) => setCommingSoon(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginTop: "20px" }}
            >
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                defaultValue={status ? "Publish" : "Unpublish"}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={status ? true : false}>
                  {status ? "Publish" : "Unpublish"}
                </option>
                <option value={status ? false : true}>
                  {status ? "Unpublish" : "Publish"}
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px", width: "20%" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleEditServices}
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

export default EditServiceType;
