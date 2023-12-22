import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddLocation(props) {
  console.log(props);
  const [parentcat, setParentcat] = useState();
  const [image, setImage] = useState();
  const [notice, setNotice] = useState();
  const [status, setStatus] = useState("Publish");
  // const Baseurl =
  //   "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const handlenewcat = async (e) => {
    console.log("in");
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", parentcat);
      formdata.append("image", image);
      formdata.append("notice", notice);
      let val;
      if (status === "Publish") {
        val = true;
      } else {
        val = false;
      }

      formdata.append("status", val);
      console.log(formdata, "from");
      const response = await axios.post(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/mainCategory/addCategory",
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
        position: toast.POSITION.TOP_CENTER,
      });
      props.getdata();
      props.setShow(false);
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
            Parent Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
              <Form.Label>Parent Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parent Category"
                value={parentcat}
                onChange={(e) => setParentcat(e.target.value)}
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
              <Form.Label>Notice</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Notice"
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
                <option>Publish</option>
                <option>Unpublish</option>
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

export default AddLocation;
