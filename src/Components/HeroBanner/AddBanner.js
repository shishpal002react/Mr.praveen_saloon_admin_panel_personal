import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { color } from "framer-motion";
import context from "react-bootstrap/esm/AccordionContext";

function AddBanner(props) {
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [colour, setColor] = useState("");
  const [position, setPosition] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [servicesId, setServiceId] = useState("");
  const [status, setStatus] = useState();
  // const [type, setType] = useState("HeroBanner");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const fromData = new FormData();
  fromData.append("image", image);
  fromData.append("desc", desc);
  fromData.append("colour", colour);
  fromData.append("position", position);
  fromData.append("mainCategoryId", mainCategoryId);
  fromData.append("categoryId", categoryId);
  fromData.append("subCategoryId", subCategoryId);
  fromData.append("servicesId", servicesId);
  fromData.append("status", status);
  fromData.append("type", "HeroBanner");

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${Baseurl}api/v1/admin/Banner/AddBanner`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      toast("banner create successfully", {
        position: "top-center",
      });
      props.getdata();
      props.onHide(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log(err);
      toast(`${err}`, {
        position: "top-center",
      });
      console.log(error.message, "error massage");
    }
  };

  const [maincategoryData, setMainCategoryData] = useState([]);
  const getMaincategoryData = async () => {
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
      setMainCategoryData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [childCategogyData, setChildCategoryData] = useState([]);

  const getChildCategoryData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Category/getAllCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "child data");
      setChildCategoryData(data);
    } catch {}
  };

  const [subCategoryData, setSubCategoryData] = useState([]);

  const getSubCategoryData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/getAllSubCategories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "child data");
      setSubCategoryData(data);
    } catch {}
  };

  const [serviceData, setServiceData] = useState([]);

  const getServicefunction = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Service/getAllService`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "service data");
      setServiceData(data);
    } catch {}
  };

  useEffect(() => {
    if (props.show === true) {
      getChildCategoryData();
      getMaincategoryData();
      getSubCategoryData();
      getServicefunction();
    }
  }, [props]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={postData}>
          {/* <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Banner Type</Form.Label>
            <Form.Control as="select" onClick={(e) => setType(e.target.value)}>
              <option>Select Type</option>
              <option value="HeroBanner">HeroBanner</option>
              <option value="Offer">Offer</option>
              <option value="Static">Static</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>Banner Image/Video</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            >
              {/* <option>Select Banner</option>
              <option value="image">Image</option>
              <option value="video">Video</option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Select Status</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Control>
          </Form.Group>
          {/* parent category */}
          <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
            <Form.Label>Select P.Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setMainCategoryId(e.target.value)}
            >
              {maincategoryData &&
                maincategoryData.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          {/* category */}
          <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
            <Form.Label>Select C.Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {childCategogyData &&
                childCategogyData.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          {/* subcategory */}
          <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
            <Form.Label>Select Sub.Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              {subCategoryData &&
                subCategoryData.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          {/* service data */}
          <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
            <Form.Label>Select Service</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setServiceId(e.target.value)}
            >
              {serviceData &&
                serviceData.map((item) => (
                  <option value={item._id}>{item.title}</option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: "20px", width: "20%" }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBanner;
