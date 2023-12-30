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
        `${Baseurl}api/v1/admin/Package/delete/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Delete Package successful", {
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
          Package Delete Successful
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Confirm Deleting the Service Group</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Package = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState([]);
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();

  //delete data model
  const [deleteDataModel, setDeleteDataModel] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Package/getAllService`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      setPackageData(response?.data?.data.reverse());
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? packageData?.filter(
        (i) =>
          i?.packageType?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.title?.toString()?.toLowerCase().includes(query?.toLowerCase())
      )
    : packageData;

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
          <h5>Packages</h5>
          <button onClick={() => navigate("/add-package")}>New Package</button>
        </div>
        <div className="pc3">
          <div className="pc10">
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
                placeholder="Search here...."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="pc7">
            <table>
              <thead>
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">
                    <i class="fa-solid fa-image"></i>
                  </th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">P. Cat</th>
                  <th className="p-2">C. cat</th>
                  <th className="p-2">Services</th>
                  <th className="p-2">Add-On</th>

                  <th className="p-2">Timing</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {slicedData &&
                  slicedData?.map((item, i) => (
                    <>
                      <tr className="odd">
                        <td className="p-2">
                          <h6>{i + 1}</h6>
                        </td>
                        <td className="p-2">
                          <img
                            src={item?.images?.[0]?.img}
                            className="childImg"
                          />
                        </td>
                        <td className="p-2">
                          <spam
                            className="serviceProImg"
                            style={{ width: "200%" }}
                          >
                            <h6>{item?.packageType}</h6>
                          </spam>
                        </td>
                        <td className="p-2">
                          <h6>{item?.title}</h6>
                        </td>
                        <td className="p-2">
                          {" "}
                          <h6>{item?.mainCategoryId?.name}</h6>
                        </td>
                        <td className="p-2">
                          {" "}
                          <h6>{item?.categoryId?.name}</h6>
                        </td>

                        <td className="p-2">
                          {item?.services?.map((i) => (
                            <div className="package1">
                              <div className="package2">
                                <img
                                  src={i?.service?.images?.[0]?.img}
                                  className="packImg"
                                />
                                <h5>{i?.service?.title}</h5>
                              </div>
                            </div>
                          ))}
                        </td>

                        <td className="p-2">
                          {item?.addOnServices?.map((i) => (
                            <div className="package1">
                              <div className="package2">
                                <img
                                  src={i?.service?.images?.[0]?.img}
                                  className="packImg"
                                />
                                <h5>{i?.service?.title}</h5>
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className="p-2">
                          <h6>{item?.timeInMin}</h6>
                        </td>
                        <td className="p-2">
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
                        <td className="p-2">
                          <button className="editBtn">
                            <i
                              class="fa fa-edit"
                              onClick={() =>
                                navigate(`/packages/edit/${item?._id}`)
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
                    </>
                  ))}

                {/* <tr>
                  <td>2</td>
                  <td>
                    <img
                      src="https://www.experts4u.in/admin/uploads/1678600562.webp"
                      className="childImg"
                    />
                  </td>
                  <td>
                    <spam className="serviceProImg" style={{ width: "200%" }}>
                      Fix
                    </spam>
                  </td>
                  <td>Salon Deal</td>
                  <td> Deal Salon at Home</td>
                  <td>Summer Special Package</td>
                  <td>
                    <div className="package1">
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835036.webp"
                          className="packImg"
                        />
                        <p>Power Mask O3+</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664875002.webp"
                          className="packImg"
                        />
                        <p>Full Arms, Half Legs, & Under Arms</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                    </div>
                  </td>
                  <td></td>

                  <td>80</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button className="deleteBtn2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr> */}
                {/* <tr className="odd">
                  <td>3</td>
                  <td>
                    <img
                      src="https://www.experts4u.in/admin/uploads/1678600562.webp"
                      className="childImg"
                    />
                  </td>
                  <td>
                    <spam className="serviceProImg" style={{ width: "200%" }}>
                      Fix
                    </spam>
                  </td>
                  <td>Salon Deal</td>
                  <td> Deal Salon at Home</td>
                  <td>Summer Special Package</td>
                  <td>
                    <div className="package1">
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1689835036.webp"
                          className="packImg"
                        />
                        <p>Power Mask O3+</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664875002.webp"
                          className="packImg"
                        />
                        <p>Full Arms, Half Legs, & Under Arms</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                      <hr />
                      <div className="package2">
                        <img
                          src="https://www.experts4u.in/admin/uploads/1664730407.webp"
                          className="packImg"
                        />
                        <p>Eyebrows & Underlips</p>
                      </div>
                    </div>
                  </td>
                  <td></td>

                  <td>80</td>
                  <td>
                    <span className="badge badge-primary">Publish</span>
                  </td>
                  <td>
                    <button className="editBtn">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button className="deleteBtn2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
            <div className="pc8">
              <h6>
                Showing 1 to{" "}
                {productSize
                  ? slicedData.length
                  : lastPostIndex2 - firstPostIndex2}{" "}
                of {packageData.length} entries
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
        getdata={getData}
      />
    </>
  );
};

export default Package;
