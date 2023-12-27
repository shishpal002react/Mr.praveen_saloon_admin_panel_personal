import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ParentCategory from "./../ParentCategory/ParentCategory";
import ChildCategory from "./../ChildCategory/ChildCategory";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import Select from "react-select";
import EditLocation from "./EditLocation";

const AddService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //location model
  const [show, setShow] = useState(false);
  //text driver
  const editor = useRef(null);
  const [service, setService] = useState();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [childCategoryId, setChildCategoryId] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState();
  const [serviceGroupId, setServiceGroupId] = useState([]);
  const [showLocation, setShowLocation] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [locationId, setLocationId] = useState("");

  //location state
  const [originalLocation, setOriginalLocation] = useState("");
  const [discountLocation, setDiscountLocation] = useState("");
  const [discountActive, setDiscountActive] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");
  //get service by id
  const getService = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/Service/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response?.data?.data;
      setService(data);
      setTitle(data?.title);
      setTime(data?.timeInMin);
      if (Array.isArray(data?.location)) {
        setLocationData(data?.location);
      } else {
        setLocationData([]);
      }
      console.log(data, "service data");
    } catch {}
  };

  useEffect(() => {
    getService();
  }, []);

  //update location data
  function addLocation(data) {
    setLocationData(data);
  }

  const initial_value = () => {
    setDescription("");
    setTitle("");
    setTime("");
    setParentCategoryId("");
    setChildCategoryId("");
    setServiceTypeId("");
    setFile("");
    setServiceGroupId([]);
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log(serviceGroupId, "print data");
    const descriptionString = Array.isArray(description)
      ? description.join("")
      : description;

    const formData = new FormData();
    formData.append("mainCategoryId", parentCategoryId);
    formData.append("categoryId", childCategoryId);
    formData.append("title", title);
    formData.append("description", descriptionString);

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
      const response = await axios.put(
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

      initial_value();
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
      setData2([]);
      setData3([]);
      setData4([]);
    } catch (error) {
      setData1([]);
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

      setData2(data);
      setData3([]);
      setData4([]);
    } catch {
      setData2([]);
    }
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

      setData3(data);
      setData4([]);
    } catch {
      setData3([]);
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

      setData4(data);
    } catch {}
  };

  useEffect(() => {
    getData4();
  }, []);

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions, "value of e");
    if (selectedOptions) {
      setServiceGroupId((prevIds) => [...prevIds, selectedOptions?.[0]?.value]);
    }
  };

  const handleRemove = (removedOption) => {
    const removedId = removedOption?.value;
    setServiceGroupId((prevIds) => prevIds.filter((id) => id !== removedId));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "10px",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
  };

  //handle edit location
  const handleEdit = (item) => {
    setShowLocation(id);
    setLocationId(item._id);
    setShow(true);
    setOriginalLocation(item?.originalPrice);
    setDiscountLocation(item?.discountPrice);
    setDiscountActive(item?.discountActive);
    setCityId(item?.city?._id);
    setAreaId(item?.sector?._id);
  };

  // //delete Location
  // const handleDelete = () => {};

  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <p className="add_service_title">Service New</p>
          <button onClick={() => navigate("/services")} id="service_button">
            New Service
          </button>
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
                    {data1?.length > 0 &&
                      data1 &&
                      data1?.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="addService2">
                  <label>Child Category</label>
                  <select
                    className="service_input_style"
                    required
                    onChange={(e) => setChildCategoryId(e.target.value)}
                  >
                    <option>Select Child Category</option>
                    {data2?.length > 0 &&
                      data2 &&
                      data2?.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="addService2 " style={{ height: "10px" }}>
                  <label>Service Group</label>
                  <Select
                    styles={customStyles}
                    options={
                      Array.isArray(data3) && data3.length > 0
                        ? data3.map((option) => ({
                            value: option._id,
                            label: option.name,
                          }))
                        : []
                    }
                    placeholder="Select option"
                    isMulti
                    required
                    onChange={handleChange}
                    onRemove={handleRemove}
                  />
                </div>
                <div className="addService2 responsive_service_data">
                  <label>Service Type</label>
                  <select
                    className="service_input_style"
                    required
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
                      required
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
                    required
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
                  required
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setDescription(newContent)}
                />
              </Form.Group>
              <div className="service_button">
                <button className="addServiceButton" type="submit">
                  Create Service
                </button>
                {showLocation && (
                  <button
                    className="addServiceButton"
                    onClick={() => setShow(true)}
                  >
                    Add Location
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        {locationData && locationData?.length > 0 && (
          <div className="ser-Loc_table" style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th className="th1">#</th>
                  <th className="th3">City</th>
                  <th className="th3">Sector</th>
                  <th className="th3">DiscountActive</th>
                  <th className="th4">OriginalPrice</th>
                  <th className="th4">DiscountPrice</th>
                  <th className="th4">Action</th>
                </tr>
              </thead>
              <tbody>
                {locationData?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.city?.name}</td>
                    <td>{item?.sector?.name}</td>
                    <td>{item?.discountActive ? "True" : "False"}</td>
                    <td>{item?.originalPrice}</td>
                    <td>{item?.discountPrice}</td>
                    <td>
                      <button className="editBtn">
                        <i
                          class="fa fa-edit"
                          onClick={() => handleEdit(item)}
                        ></i>
                      </button>
                      {/* <button className="deleteBtn">
                        <i
                          class="fa-solid fa-trash"
                          onClick={() => handleDelete(item._id)}
                        ></i>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <EditLocation
        show={show}
        onHide={() => setShow(false)}
        setShow={setShow}
        showLocation={showLocation}
        addLocation={addLocation}
        locationId={locationId}
        originalLocation={originalLocation}
        discountLocation={discountLocation}
        discountActive={discountActive}
        cityId={cityId}
        areaId={areaId}
        getService={getService}
      />
    </>
  );
};

export default AddService;
