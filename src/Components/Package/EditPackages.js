import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import Select from "react-select";
import EditLocation from "./EditLocation";

const EditPackages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //location model
  const [show, setShow] = useState(false);
  //text driver
  const editor = useRef(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [childCategoryId, setChildCategoryId] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("");
  const [serviceGroupId, setServiceGroupId] = useState([]);
  const [serviceSingleGroupId, setServiceSingleGroupId] = useState([]);
  const [showLocation, setShowLocation] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const [addOnServicesId, setAddOnServicesId] = useState([]);
  const [packageDataArray, setPackageDataArray] = useState({});

  //addLocation id
  const [addServiceByLocation, setAddServiceByLocation] = useState([]);
  const [showLocationArray, setShowLocationArray] = useState([]);
  const [serviceSingleGroupArray, setServiceSingleGroupArray] = useState([]);
  //location state
  const [locationId, setLocationId] = useState("");
  const [originalLocation, setOriginalLocation] = useState("");
  const [discountLocation, setDiscountLocation] = useState("");
  const [discountActive, setDiscountActive] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  useEffect(() => {
    setStatus(packageDataArray?.status);
    setServiceSingleGroupArray(packageDataArray?.subCategoryId);
    setTitle(packageDataArray?.title);
    setTime(packageDataArray?.timeInMin);
    setParentCategoryId(packageDataArray?.mainCategoryId?._id);
    setChildCategoryId(packageDataArray?.categoryId?._id);
  }, [packageDataArray]);

  useEffect(() => {
    serviceSingleGroupArray?.map((item) => {
      console.log(item, "value");
      return setServiceGroupId((prev) => [
        ...prev,
        {
          value: item?._id,
          label: item?.name,
        },
      ]);
    });
  }, [serviceSingleGroupArray]);

  //update location data setServiceGroupId
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
    setStatus("");
    setServiceGroupId([]);
  };

  const postData = async (e) => {
    e.preventDefault();

    const arr1 = [];
    for (let i = 0; i < serviceGroupId.length; i++) {
      arr1.push(serviceGroupId[i].value);
    }

    const arr2 = [];
    for (let i = 0; i < serviceId.length; i++) {
      arr2.push(serviceId[i].value);
      setAddServiceByLocation((prev) => [...prev, serviceId[i].value]);
    }

    const arr3 = [];
    for (let i = 0; i < addOnServicesId.length; i++) {
      arr3.push(addOnServicesId[i].value);
    }

    const descriptionString = Array.isArray(description)
      ? description.join("")
      : description;

    const formData = new FormData();
    formData.append("mainCategoryId", parentCategoryId);
    formData.append("categoryId", childCategoryId);
    formData.append("title", title);
    formData.append("description", descriptionString);
    formData.append("type", "Package");
    formData.append("packageType", serviceTypeId);
    formData.append("status", status);
    formData.append("timeInMin", time);

    arr1.forEach((item) => {
      formData.append(`subCategoryId`, item);
    });

    arr2.forEach((item) => {
      formData.append(`services`, item);
    });

    arr3.forEach((item) => {
      formData.append(`addOnServices`, item);
    });

    Array.from(file).forEach((img) => {
      formData.append("image", img);
    });

    const solve = {
      mainCategoryId: parentCategoryId,
      categoryId: childCategoryId,
      subCategoryId: arr1,
    };

    try {
      const response = await axios.put(
        `${Baseurl}/api/v1/admin/Package/update/${id}`,
        solve,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }
      );
      const data = response?.data?.data;
      setShowLocation(data?._id);
      initial_value();
      toast("Package is create successful", {
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
  const [servicesArray, setServicesArray] = useState([]);

  const getPackageData = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/Package/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response.data.data;
      setPackageDataArray(data);
      setShowLocationArray(data?.location);
    } catch (error) {
      console.log("package data error", error.data);
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Service/${parentCategoryId}/${childCategoryId}/${serviceSingleGroupId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      const data = response.data.data;
      setServicesArray(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (parentCategoryId && childCategoryId && serviceSingleGroupId) {
      getServices();
    }
  }, [serviceSingleGroupId]);

  //parent category
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
      //   setData2([]);
      //   setData3([]);
      //   setData4([]);
      setServiceGroupId([]);
      console.log("parent data", data);
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
      console.log(data, "child data");
      setData2(data);
      //   setData3([]);
      //   setData4([]);
      setServiceGroupId([]);
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
      console.log(data, "service group data");
      setData3(data);
      //   setData4([]);
    } catch {
      setData3([]);

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
    getPackageData();
  }, []);

  // get service Group
  const handleChange = (selectedOptions) => {
    setServiceGroupId(selectedOptions);
    setServiceSingleGroupId(selectedOptions?.[0]?.value);
  };

  //set services
  const handleChangeServices = (selectedOptions) => {
    setServiceId(selectedOptions);
  };

  //set add on services
  const handleChangeAddOnServices = (selectedOptions) => {
    setAddOnServicesId(selectedOptions);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,

      alignContent: "center",
    }),
  };

  //handle Edit Location
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
  return (
    <>
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <p className="add_service_title">Edit Package </p>
          <button onClick={() => navigate("/packages")} id="service_button">
            All Package
          </button>
        </div>
        <div className="pc3">
          <h4 className="addServiceh4">Package Details </h4>
          <hr />
          <div className="addServiceform">
            <form onSubmit={postData}>
              <div className="addService1">
                <div className="addService2">
                  <label>Package Title</label>
                  <input
                    type="text"
                    alt=""
                    placeholder="Service Title"
                    value={title}
                    className="service_input_style"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="addService2">
                  <label>Package Timing</label>
                  <input
                    type="text"
                    alt=""
                    placeholder="Service Timing"
                    value={time}
                    className="service_input_style"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="addService2">
                  <label>Parent Category</label>
                  <select
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
                    value={serviceGroupId}
                    onChange={handleChange}
                  />
                </div>
                <div className="addService2 responsive_service_data">
                  <label>Package Type</label>
                  <select
                    className="service_input_style"
                    onChange={(e) => setServiceTypeId(e.target.value)}
                  >
                    <option>Select Service Type</option>
                    <option value="Normal">Normal</option>
                    <option value="Customize">Customize</option>
                    <option value="Edit">Edit</option>
                  </select>
                </div>
                <div className="addService2">
                  <Form.Group className="mb-3">
                    <Form.Label>Package Image</Form.Label>
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
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option>Select Status</option>
                    <option value={true}>Publish</option>
                    <option value={false}>Unpublish</option>
                  </select>
                </div>
                <div className="addService2">
                  <label>Select Services</label>
                  <Select
                    styles={customStyles}
                    options={
                      Array.isArray(servicesArray) && servicesArray.length > 0
                        ? servicesArray.map((option) => ({
                            value: option._id,
                            label: option.title,
                          }))
                        : []
                    }
                    placeholder="Select option"
                    isMulti
                    onChange={handleChangeServices}
                  />
                </div>
                <div className="addService2">
                  <label>Add-on Services</label>
                  <Select
                    styles={customStyles}
                    options={
                      Array.isArray(servicesArray) && servicesArray.length > 0
                        ? servicesArray.map((option) => ({
                            value: option._id,
                            label: option.title,
                            id: option.someId,
                          }))
                        : []
                    }
                    placeholder="Select option"
                    isMulti
                    onChange={handleChangeAddOnServices}
                  />
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
              <div className="service_button">
                <button className="addServiceButton" type="submit">
                  Create package
                </button>
                {/* {showLocation && (
                  <button
                    className="addServiceButton"
                    onClick={() => setShow(true)}
                  >
                    Add Location
                  </button>
                )} */}
              </div>
            </form>
          </div>
        </div>
        {showLocationArray.length > 0 && (
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
                </tr>
              </thead>
              <tbody>
                {showLocationArray?.map((item, i) => (
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
        addServiceByLocation={addServiceByLocation}
        locationId={locationId}
        originalLocation={originalLocation}
        discountLocation={discountLocation}
        discountActive={discountActive}
        cityId={cityId}
        areaId={areaId}
        getPackageData={getPackageData}
      />
    </>
  );
};

export default EditPackages;
