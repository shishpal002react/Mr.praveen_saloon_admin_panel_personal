import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddLocationEditPackage(props) {
  const [serviceId, setServiceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discountActive, setDiscountIsActive] = useState("");
  const [city, setCity] = useState([]);
  const [sector, setSector] = useState([]);

  //addLocation id
  const [addServiceByLocation, setAddServiceByLocation] = useState([]);
  const [locationArray, setLocationArray] = useState([]);

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

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
      const response = await axios.get(
        `${Baseurl}api/v1/admin/areas/city/${cityId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      const data = response.data.data;

      setSector(data);
    } catch {}
  };

  useEffect(() => {
    getArea();
  }, [cityId]);

  const getServices = async (id) => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/Service/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response?.data?.data;
      setLocationArray((prev) => [...prev, data]);
    } catch (error) {}
  };

  useEffect(() => {
    if (props.show === true) {
      getCity();
      getArea();
      setServiceId(props?.showLocation);
      setAddServiceByLocation(props?.addServiceByLocation);
      for (let i = 0; i < addServiceByLocation.length; i++) {
        getServices(addServiceByLocation[i]);
      }
    }
  }, [props, addServiceByLocation]);

  useEffect(() => {
    if (props.show !== true) {
      setLocationArray([]);
      setRegularPrice("");
      setSalePrice("");
      setCityId("");
      setAreaId("");
    }
  }, [props]);

  console.log("regularPrice ", regularPrice);
  console.log("cityId ", cityId);

  const settingFunc = useCallback(() => {
    if (cityId && areaId) {
      if (locationArray?.length > 0) {
        locationArray.forEach((item) => {
          item.location.forEach((i) => {
            if (i?.city?._id === cityId && i?.sector?._id === areaId) {
              setRegularPrice(i.originalPrice);
              setSalePrice(i.discountPrice);
            }
          });
        });
      }
    }
  }, [cityId, areaId, locationArray]);

  useEffect(() => {
    if (props.show) {
      settingFunc();
    }
  }, [settingFunc, props]);

  console.log(locationArray);

  const handlenewcat = async (e) => {
    e.preventDefault();

    const data = {
      location: [
        {
          city: cityId,
          sector: areaId,
          originalPrice: regularPrice,
          discountActive: discountActive,
          discountPrice: salePrice,
        },
      ],
    };
    try {
      const response = await axios.put(
        `${Baseurl}api/v1/admin/package/${serviceId}/add-location`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Add Location Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      props.addLocation(response?.data?.data?.location);
      props.addServiceByLocation(false);
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

export default AddLocationEditPackage;
