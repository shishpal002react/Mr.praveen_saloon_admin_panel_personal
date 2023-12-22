import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import ParentCategory from "./../ParentCategory/ParentCategory";
import ChildCategory from "./../ChildCategory/ChildCategory";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import Select from "react-select";
import AddCategory from "./AddLocation";

const AddService = () => {
  const navigate = useNavigate();
  //location model
  const [show, setShow] = useState(false);
  //text driver
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [time, setTime] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [childCategoryId, setChildCategoryId] = useState("");

  const [serviceTypeId, setServiceTypeId] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState();
  const [showLocation, setShowLocation] = useState("");
  const [serviceGroupId, setServiceGroupId] = useState([]);

  const handle_Discount_function = () => {
    const discountPercentage =
      ((regularPrice - salePrice) / regularPrice) * 100;
    setDiscount(discountPercentage.toFixed(2));
    if (regularPrice === "" || salePrice === "") {
      setDiscount("");
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "10px",
      textAlign: "center",
    }),
  };
  useEffect(() => {
    if (regularPrice && salePrice) {
      handle_Discount_function();
    }
  }, [regularPrice, salePrice]);

  const postData = async (e) => {
    e.preventDefault();
    console.log(serviceGroupId, "print data");
    const formData = new FormData();
    formData.append("mainCategoryId", parentCategoryId);
    formData.append("categoryId", childCategoryId);
    formData.append("title", title);
    formData.append("description[0]", description);
    formData.append("originalPrice", regularPrice);
    formData.append("discountPrice", discount);
    formData.append("serviceTypesId", serviceTypeId);
    formData.append("status", status);
    formData.append("timeInMin", time);

    serviceGroupId.forEach((item, i) => {
      formData.append(`subCategoryId[${i}]`, item);
    });
    Array.from(file).forEach((img) => {
      formData.append("image", img);
    });

    try {
      const response = await axios.post(
        `${Baseurl}api/v1/admin/Service/addService`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      const data = response?.data?.data;
      setShowLocation(data?._id);
      toast("services is create successful", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //Data parent and child
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  //parent category
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getData1 = async () => {
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
      console.log("parent data", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData1();
  }, []);

  //child category
  const getData2 = async () => {
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
    getData2();
  }, [parentCategoryId]);

  //service group
  const getData3 = async () => {
    try {
      const response = await axios.get(
        //url is not right
        `${Baseurl}/api/v1/admin/SubCategory/${parentCategoryId}/${childCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "service group data");
      setData3(data);
    } catch {
      setData3([]);
      console.log(data3);
      console.log("Setting");
    }
  };

  useEffect(() => {
    getData3();
  }, [parentCategoryId, childCategoryId]);

  //service type
  const getData4 = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/serviceTypes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      });
      const data = response.data.data;
      console.log(data, "service type");
      setData4(data);
    } catch {}
  };

  useEffect(() => {
    getData4();
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setServiceGroupId((prevIds) => [...prevIds, selectedOption._id]);
    } else {
      setServiceGroupId((prevIds) =>
        prevIds.filter((id) => id !== selectedOption._id)
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <p className="add_service_title">Service New</p>
          <button onClick={() => navigate("/services")}>New Service</button>
        </div>
        <div className="pc3">
          <h4 className="addServiceh4">Service Details </h4>
          <hr />
          <div className="addServiceform">
            <form onSubmit={postData}>
              <div className="addService1">
                <div className="addService2">
                  <label>Service Title</label>
                  <input
                    type="text"
                    alt=""
                    required
                    placeholder="Service Title"
                    value={title}
                    className="service_input_style"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Regular Price</label>
                  <input
                    type="text"
                    alt=""
                    required
                    placeholder="Regular Price"
                    value={regularPrice}
                    className="service_input_style"
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Sale Price</label>
                  <input
                    type="text"
                    alt=""
                    required
                    placeholder="Sale Price"
                    value={salePrice}
                    className="service_input_style"
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Discount (%) </label>
                  <input
                    type="text"
                    alt=""
                    required
                    placeholder="Discount"
                    value={discount}
                    disabled
                    className="service_input_style"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div className="addService2">
                  <label>Service Timing</label>
                  <input
                    type="text"
                    alt=""
                    required
                    placeholder="Service Timing"
                    value={time}
                    className="service_input_style"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Parent Category</label>
                  <select
                    required
                    className="service_input_style"
                    onChange={(e) => setParentCategoryId(e.target.value)}
                  >
                    <option>Select Parent Category</option>
                    {data1.length > 0 &&
                      data1 &&
                      data1.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="addService2">
                  <label>Child Category</label>
                  <select
                    className="service_input_style"
                    onChange={(e) => setChildCategoryId(e.target.value)}
                  >
                    <option>Select Child Category</option>
                    {data2.length > 0 &&
                      data2 &&
                      data2.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="addService2" style={{ height: "10px" }}>
                  <label>Service Group</label>
                  <div>
                    <Select
                      styles={customStyles}
                      options={data3?.map((option) => ({
                        value: option._id,
                        label: option.name,
                      }))}
                      placeholder="Select an option"
                      isMulti
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="addService2">
                  <label>Service Type</label>
                  <select
                    className="service_input_style"
                    onChange={(e) => setServiceTypeId(e.target.value)}
                  >
                    <option>Select Service Type</option>
                    {data4.length > 0 &&
                      data4 &&
                      data4.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="addService2">
                  <Form.Group className="mb-3">
                    <Form.Label>Service Image</Form.Label>
                    <Form.Control
                      onChange={(e) => setFile(e.target.files)}
                      type="file"
                      size="sm"
                      multiple
                    />
                  </Form.Group>
                </div>
                <div className="addService2">
                  <label>Status</label>
                  <select
                    className="service_input_style"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Select Status</option>
                    <option value={true}>Publish</option>
                    <option value={false}>Unpublish</option>
                  </select>
                </div>
              </div>
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
              <button className="addServiceButton" type="submit">
                Create Service
              </button>
              {showLocation && (
                <span className="loc_btn_style" onClick={() => setShow(true)}>
                  Add Location
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
      <AddCategory
        show={show}
        onHide={() => setShow(false)}
        setShow={setShow}
        showLocation={showLocation}
      />
    </>
  );
};

export default AddService;
