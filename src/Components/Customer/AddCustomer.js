import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";

function AddCustomer(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label> Mobile No</Form.Label>
            <Form.Control type="text" placeholder="User Mobile No" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="User Name" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="User Email" />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px", width: "20%" }}>
            <Button variant="primary" type="submit">
              Add Customer
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCustomer;
