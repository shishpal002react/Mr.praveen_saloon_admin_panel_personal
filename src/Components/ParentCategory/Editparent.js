import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editparent(props) {
  const name = props.name;
  const ID = props.catid;

  // const getData = props.getItem;
  console.log(ID, "inn");
  const [parentcat, setParentcat] = useState();
  const [id, setId] = useState();
  const [status, setStatus] = useState();

  const [image, setImage] = useState();
  const [notice, setNotice] = useState();
  // const [status, setStatus] = useState("Publish");
  // console.log(status, "parent category status");
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  useEffect(() => {
    if (props.show === true) {
      setNotice(props.notice);
      setParentcat(name);
      setStatus(props.status);
      setId(ID);
    }
  }, [props]);

  const handlenewcat = async (e) => {
    console.log("in");
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", parentcat);
      formdata.append("image", image);
      formdata.append("notice", notice);
      // let val;

      // if (status === "Publish") {
      //   val = true;
      // } else {
      //   val = false;
      // }

      formdata.append("status", status);

      // formdata.append("status", val);
      console.log(formdata, "from shishpal");

      const response = await axios.put(
        `${Baseurl}/api/v1/admin/mainCategory/updateCategory/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Parent Category Edit Successful", {
        position: toast.POSITION.TOP_CENTER,
      });

      props.onHide();
      props.getdata();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
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
                onClick={(e) => handlenewcat(e)}
              >
                Save Category
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Editparent;
