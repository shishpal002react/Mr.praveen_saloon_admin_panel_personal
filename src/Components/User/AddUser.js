import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";

function AddUser(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>User Mobile No</Form.Label>
            <Form.Control type="text" placeholder="User Mobile No" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="User Name" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>User Email</Form.Label>
            <Form.Control type="email" placeholder="User Email" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>

          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginTop: "20px" }}
          >
            <Form.Label>Status</Form.Label>
            <Form.Control as="select">
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>
          <Form.Group style={{ marginTop: "20px", width: "20%" }}>
            <Button variant="primary" type="submit">
              Save Type
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddUser;
