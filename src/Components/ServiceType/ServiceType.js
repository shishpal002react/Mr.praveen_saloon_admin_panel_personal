import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AddServiceType from "./AddServiceType";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import EditServiceType from "./EditServiceType";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//service type
function MyVerticallyCenteredModal(props) {
  const [deleteId, setDeleteId] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  useEffect(() => {
    if (props.show === true) {
      setDeleteId(props.deleteDataId);
    }
  }, [props]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${Baseurl}api/v1/admin/serviceTypes/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Delete services type successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      props.getdata();
      props.onHide();
    } catch {}
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Service Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Confirm Deleting the Service Group</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ServiceType = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();

  //handle data edit api gdin hg
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [id, setId] = useState();
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [commingSoon, setCommingSoon] = useState();

  //delete data model
  const [deleteDataModel, setDeleteDataModel] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState("");

  //api call
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    console.log("its is token or not", localStorage.getItem("access"));
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/serviceTypes`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
        },
      });
      const data = response.data.data;
      setProduct(data.reverse());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //handle edit id
  const handleEdit = (item) => {
    setShowEdit(true);
    setName(item.name);
    setStatus(item.status);
    setCommingSoon(item.notice);
    setId(item._id);
    setMainCategoryId(item.mainCategoryId);
  };

  console.log(name, status, "gyhij bdueu fe jf");

  //pagination  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? product?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.notice?.toString()?.toLowerCase().includes(query?.toLowerCase())
      )
    : product;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  //prduct is define

  let slicedData;
  if (productSize) {
    slicedData = TotolData?.slice(firstPostIndex2, productSize);
  } else {
    slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);
  }

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setProductSize();
    if (currentPage2 < pages2.length) {
      setCurrentPage2(currentPage2 + 1);
    }
  }

  function Prev() {
    setProductSize();
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  return (
    <>
      <AddServiceType
        show={show}
        onHide={() => setShow(false)}
        getdata={getdata}
        data={product}
      />
      <EditServiceType
        show={showEdit}
        onHide={() => setShowEdit(false)}
        name={name}
        id={id}
        status={status}
        commingSoon={commingSoon}
        getdata={getdata}
        MainCategoryId={mainCategoryId}
      />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Service Types</h5>
          <button onClick={() => setShow(true)}>New Type</button>
        </div>
        <div className="pc3">
          <div className="pc4">
            <div className="pc5">
              <h6>Show</h6>
              <select onClick={(e) => setProductSize(e.target.value)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <h6>entries</h6>
            </div>
            <div className="pc6">
              <h6>Search : </h6>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here...."
              />
            </div>
          </div>
          <div className="pc7">
            <table>
              <thead>
                <tr>
                  <th className="th1">#</th>
                  <th className="th3">Type</th>
                  <th className="th3">Notice</th>
                  <th className="th6">Status</th>
                  <th className="th7">Action</th>
                </tr>
              </thead>
              <tbody>
                {slicedData &&
                  slicedData.map((item, index) => (
                    <tr className="odd">
                      <td>
                        <h6>{index + 1}</h6>
                      </td>
                      <td>
                        <h6>{item.name}</h6>
                      </td>
                      <td>
                        <h6>{item.notice}</h6>
                      </td>
                      <td>
                        <span className="badge ">
                          {item.status ? (
                            <p className="badge-danger">
                              <h6>Publish</h6>
                            </p>
                          ) : (
                            <p className="backColor">
                              <h6>Unpublish</h6>
                            </p>
                          )}
                        </span>
                      </td>
                      <td>
                        <button className="editBtn">
                          <i
                            class="fa fa-edit"
                            onClick={() => handleEdit(item)}
                          ></i>
                        </button>
                        <button className="deleteBtn">
                          <i
                            class="fa-solid fa-trash"
                            onClick={() => {
                              setDeleteDataModel(true);
                              setDeleteDataId(item._id);
                            }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="pc8">
              <h6>
                Showing 1 to{" "}
                {productSize
                  ? slicedData.length
                  : lastPostIndex2 - firstPostIndex2}{" "}
                of {product.length} entries
              </h6>
              <ul className="pc9">
                <button onClick={() => Prev()} className="myButton ">
                  <li>Previous</li>
                </button>

                <li className="pagiBtn">{currentPage2}</li>
                <button onClick={() => Next()} className="nextBtn myButton ">
                  <li>Next</li>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={deleteDataModel}
        onHide={() => setDeleteDataModel(false)}
        deleteDataId={deleteDataId}
        getdata={getdata}
      />
    </>
  );
};

export default ServiceType;
