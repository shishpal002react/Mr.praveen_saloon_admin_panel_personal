import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function EditServiceGroup(props) {
  // const namep = props.name;//djfdj
  // const statusp = props.status;
  // const [name, setName] = useState("");
  // const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const [image, setImage] = useState("");
  const [parentCategory, setParentCategory] = useState();
  const [childCategory, setChildCategory] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  //text driver
  const editor = useRef(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(props.name);
    setStatus(props.status);
    setColor(props.colourPicker);
    setImage(props.image);
    setParentCategory(props.mainCategoryId);
    setChildCategory(props.childCategoryId);
    setDescription(props.description);
    setId(props.id);
  }, [props]);

  console.log("color is service group", color);

  // setName(props.name);
  //parent category
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
      setData1(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //child category
  const getData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Category/allCategory/${parentCategory}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "child data");
      setData2(data);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, [parentCategory]);

  const handleAddGroup = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("status", status);
      formdata.append("image", image);
      formdata.append("mainCategoryId", parentCategory);
      formdata.append("categoryId", childCategory);
      formdata.append("description", description);
      formdata.append("colourPicker", color);

      console.log(formdata, "from data golu don");

      const response = await axios.put(
        `https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/SubCategory/update/${id}`,
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
      toast.success("Edit Group services successful", {
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
            Edit Service Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
                <Form.Label>Select P.Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setParentCategory(e.target.value)}
                >
                  {data1 &&
                    data1.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                </Form.Control>
                <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
                  <Form.Label>Select C.Category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setChildCategory(e.target.value)}
                  >
                    {data2 &&
                      data2.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Form.Group>
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Group name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Category Image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Group Description</Form.Label>
              <JoditEditor
                ref={editor}
                value={description}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => setDescription(newContent)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                value={color}
                style={{
                  width: "40px",
                  height: "13px",
                  backgroundColor: `${color}`,
                }}
                onChange={(e) => setColor(e.target.value)}
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
              <Button variant="primary" type="submit" onClick={handleAddGroup}>
                Save Group
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditServiceGroup;
