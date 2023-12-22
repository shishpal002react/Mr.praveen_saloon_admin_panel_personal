import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory(props) {
  const [childcat, setChildcat] = useState();
  const [parentcat, setParentcat] = useState();
  const [image, setImage] = useState();
  const [notice, setNotice] = useState();
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const [data, setData] = useState();
  // const [categoryid, setCategoryid] = useState();

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
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  console.log("data is not find", data);

  const handlenewcat = async (e) => {
    console.log("in");
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", childcat);
      formdata.append("image", image);
      formdata.append("notice", notice);
      formdata.append("mainCategoryId", parentcat);
      // formdata.append("colour", color);
      let val;
      if (status === "Publish") {
        val = true;
      } else {
        val = false;
      }

      formdata.append("status", val);

      console.log(formdata, "from");
      const response = await axios.post(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/Category/createCategory",
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
      toast.success("Add child Category successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      props.getdata();
      props.onHide();
    } catch (e) {
      console.log(e);
    }
  };

  // const handleparentcategoryid=async(e)=>{
  //   setParentcat(e.target.value)
  //   console.log(parentcat);
  //   try {
  //     const response = await axios.get(`${Baseurl}api/v1/admin/mainCategory/allCategory`, {
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         },
  //     });
  //     const data = response.data.data;
  //     const match = data.filter((item)=>item.name === parentcat);
  //     console.log(match,"matched");
  //     // setCategoryid()
  //     // setData(data);

  // } catch { }
  // }

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
            Child Category
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
              <Form.Label>Child Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Child Category"
                value={childcat}
                onChange={(e) => setChildcat(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Notice</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Select Color</Form.Label>
              <Form.Control
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Category Image"
                onChange={(e) => setImage(e.target.files[0])}
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
                <option value="Unpublish">Unpublish</option>
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px", width: "20%" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handlenewcat(e)}
              >
                Save Category
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AddCategory;
