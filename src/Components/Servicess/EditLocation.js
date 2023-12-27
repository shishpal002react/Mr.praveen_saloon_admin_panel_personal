import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditLocation(props) {
  const [serviceId, setServiceId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discountActive, setDiscountIsActive] = useState("");
  const [city, setCity] = useState([]);
  const [sector, setSector] = useState([]);

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  //location
  // const handle_Discount_function = () => {
  //   const discountPercentage =
  //     ((regularPrice - salePrice) / regularPrice) * 100;
  //   setDiscount(discountPercentage.toFixed(2));
  //   if (regularPrice === "" || salePrice === "") {
  //     setDiscount("");
  //   }
  // };

  // useEffect(() => {
  //   if (regularPrice && salePrice) {
  //     handle_Discount_function();
  //   }
  // }, [regularPrice, salePrice]);

  const getCity = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/city/cities`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response.data.data;

      setCity(data);
    } catch {}
  };

  const getArea = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/area/areas`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response.data.data;

      setSector(data);
    } catch {}
  };

  useEffect(() => {
    if (props.show === true) {
      getCity();
      getArea();
      setServiceId(props?.showLocation);
      setLocationId(props?.locationId);
      setRegularPrice(props?.originalLocation);
      setSalePrice(props?.discountLocation);
      setAreaId(props?.areaId);
      setCityId(props?.cityId);
      setDiscountIsActive(props?.discountActive);
    }
  }, [props]);
  console.log(regularPrice, "regular pricr in edit location");
  console.log(salePrice, "sales pricr in edit location");

  const handlenewcat = async (e) => {
    e.preventDefault();

    const data = {
      city: cityId,
      sector: areaId,
      originalPrice: regularPrice,
      discountActive: discountActive,
      discountPrice: salePrice,
    };
    try {
      const response = await axios.put(
        `${Baseurl}api/v1/admin/services/${serviceId}/update-location/${locationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      console.log(response, "success data is location ");
      toast.success("Add Location Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      props.addLocation(response?.data?.data?.location);
      props.getService();
      props.setShow(false);
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
            Add Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="popUpFrom" style={{ marginTop: "20px" }}>
              <Form.Label>City </Form.Label>
              <Form.Select onChange={(e) => setCityId(e.target.value)}>
                <option>Open this select menu</option>
                {city.map((item, i) => (
                  <option value={item._id}>{item?.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Select onChange={(e) => setAreaId(e.target.value)}>
                <option>Open this select menu</option>
                {sector.map((item, i) => (
                  <option value={item._id}>{item?.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Discount Active</Form.Label>
              <Form.Select
                onChange={(e) => setDiscountIsActive(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginTop: "20px" }}
            >
              <Form.Label>Regular Price</Form.Label>
              <Form.Control
                type="number"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginTop: "20px" }}
            >
              <Form.Label>Sales Price</Form.Label>
              <Form.Control
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "20px", width: "20%" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handlenewcat(e)}
              >
                Save Location
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditLocation;
