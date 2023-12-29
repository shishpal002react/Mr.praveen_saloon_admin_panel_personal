import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

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
        `${Baseurl}api/v1/admin/Service/delete/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Delete services successful", {
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

const Service = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();

  //delete data model
  const [deleteDataModel, setDeleteDataModel] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState("");

  const getdata = async () => {
    try {
      const response = await axios.get(
        "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/Service/getAllService",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "servid");
      setProduct(data.reverse());
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? product?.filter(
        (i) =>
          i?.title?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mainCategoryId.name
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
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
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Services</h5>
          <button onClick={() => navigate("/add-services")}>Add Service</button>
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
          <div className="pc7" style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th className="th1">#</th>
                  <th className="th2">
                    <i class="fa-solid fa-image"></i>
                  </th>
                  <th className="th3">Title</th>
                  <th className="th3">P. Category</th>
                  <th className="th3">C. Category</th>
                  {/* <th className="th4">Price</th>
                  <th className="th4">Discount</th> */}
                  <th className="th4">Time</th>
                  {/* <th className="th4">Rating</th> */}
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
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835145.png"
                          className="serviceImg"
                        />
                      </td>
                      <td>
                        <h6>{item.title}</h6>
                      </td>
                      <td>
                        <h6>{item.mainCategoryId.name}</h6>
                      </td>
                      <td>
                        <h6>{item.categoryId.name}</h6>
                      </td>
                      {/* <td>
                        {" "}
                        <h6>{item.originalPrice}</h6>
                      </td>
                      <td>
                        <h6> {item.discount}</h6>
                      </td> */}
                      <td>
                        <h6>{item.timeInMin}</h6>
                      </td>
                      {/* <td>
                        <h6>{item.rating}</h6>
                      </td> */}
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
                            onClick={() =>
                              navigate(`/edit-services/${item._id}`)
                            }
                          ></i>
                        </button>
                        <button className="deleteBtn2">
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

export default Service;
