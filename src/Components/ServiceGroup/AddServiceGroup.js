import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function AddServiceGroup(props) {
  //iff
  const [name, setName] = useState();
  const [status, setStatus] = useState();

  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [childCategory, setChildCategory] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  //text driver
  const editor = useRef(null);
  const [description, setDescription] = useState("");

  console.log(parentCategoryId, "parent category id");

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
        `${Baseurl}api/v1/admin/Category/allCategory/${parentCategoryId}`,
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
  }, [parentCategoryId]);

  const handleAddGroup = async (e) => {
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

      formdata.append("status", val);
      formdata.append("image", image);
      formdata.append("mainCategoryId", parentCategoryId);
      formdata.append("categoryId", childCategory);
      formdata.append("description", description);
      formdata.append("colourPicker", color);

      console.log(formdata, "from data golu");

      const response = await axios.post(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/SubCategory/createCategory",
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
      toast.success("Add group service successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      props.onHide();
      props.getdata();
      // props.setShow(false);
      // props.onHide();
    } catch (e) {
      toast.success(e?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
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
            Service Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
                <Form.Label>Select P.Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setParentCategoryId(e.target.value)}
                >
                  <option>Select Parent Category</option>
                  {data1 &&
                    data1.map((item) => (
                      <option value={item?._id}>{item.name}</option>
                    ))}
                </Form.Control>
                <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
                  <Form.Label>Select C.Category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setChildCategory(e.target.value)}
                  >
                    {data2.length > 0 &&
                      data2.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Form.Group>
              <Form.Label>Service Group Name</Form.Label>
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
                placeholder=""
                value={color}
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
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Publish</option>
                <option>Unpublish</option>
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

export default AddServiceGroup;
