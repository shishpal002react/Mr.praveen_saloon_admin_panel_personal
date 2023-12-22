import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editchild(props) {
  const [childcat, setChildcat] = useState();
  const [parentcat, setParentcat] = useState();
  const [image, setImage] = useState();
  const [notice, setNotice] = useState();
  const [status, setStatus] = useState();
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    setChildcat(props.name);
    setParentcat(props.pCate);
    setNotice(props.notice);
    setId(props.id);
    setStatus(props.status);
    setColor(props.color);
  }, [props]);

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
  console.log(id);
  const handlenewcat = async (e) => {
    console.log("in");
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("name", childcat);
      formdata.append("image", image);
      formdata.append("notice", notice);
      formdata.append("mainCategoryId", parentcat);
      formdata.append("status", status);
      // formdata.append("colour", color);
      const response = await axios.put(
        `https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/Category/update/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Edit child category successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(response, "success");
      props.onHide();
      props.getdata();
    } catch (e) {
      // console.log(e); only testing use
      // toast.success("Edit child category successful", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      // props.onHide();
      // props.getdata();
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
            Edit Child Category
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
                style={{
                  width: "30px",
                  height: "20px",
                  backgroundColor: `${color}`,
                }}
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

export default Editchild;
