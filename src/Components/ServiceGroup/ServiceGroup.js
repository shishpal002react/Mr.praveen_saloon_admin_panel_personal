import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AddServiceGroup from "./AddServiceGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import EditServiceGroup from "./EditServiceGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ServiceGroup = () => {
  // hijif jfih
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();

  //edit api
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colourPicker, setColourPicker] = useState();
  const [mainCategoryId, setMainCategoryId] = useState();
  const [childCategoryId, setChildCategoryId] = useState();
  const [status, setStatus] = useState("");
  const [image, setImage] = useState();
  const [id, setId] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/getAllSubCategories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "subcategory data");
      setProduct(data.reverse());
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  //delete api
  const handleDelete = async (id) => {
    console.log("delete data", id);
    try {
      const response = await axios.delete(
        `${Baseurl}api/v1/admin/SubCategory/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access")
            )}`,
          },
        }
      );
      toast.success("Delete Group services successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      getdata();
    } catch {}
  };

  //handle edit id
  const handleEdit = (item) => {
    setShowEdit(true);
    setDescription(item.description);
    setMainCategoryId(item.mainCategoryId._id);
    setChildCategoryId(item.categoryId._id);
    setColourPicker(item.colourPicker);
    setName(item.name);
    setImage(item.image);
    setStatus(item.status);
    setId(item._id);
  };

  // Pagination
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

  const htmlString =
    '<ul style="list-style-type: circle;"><li>hello<strong></strong></li></ul>';

  return (
    <>
      <AddServiceGroup
        show={show}
        onHide={() => setShow(false)}
        getdata={getdata}
      />
      <EditServiceGroup
        show={showEdit}
        onHide={() => setShowEdit(false)}
        mainCategoryId={mainCategoryId}
        childCategoryId={childCategoryId}
        colourPicker={colourPicker}
        status={status}
        image={image}
        id={id}
        name={name}
        description={description}
        getdata={getdata}
      />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Service Groups</h5>
          <button onClick={() => setShow(true)}>New Group</button>
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
                  <th className="th3">Group Name</th>
                  <th className="th3">P.Category</th>
                  <th className="th3">C.Category</th>
                  <th className="th3">Group Description</th>
                  <th className="th3">Color</th>
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
                        <h6>{item.mainCategoryId.name}</h6>
                      </td>
                      <td>
                        <h6>{item.categoryId.name}</h6>
                      </td>
                      <td>
                        <h6>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </h6>
                        {/* dangerouslySetInnerHTML={{ __html: slicedData?.[0]?.description }} */}
                      </td>
                      <td>
                        <h6
                          style={{
                            backgroundColor: `${item.colourPicker}`,
                            height: "20px",
                            width: "30px",
                          }}
                        ></h6>
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
                            onClick={() => handleDelete(item._id)}
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

            {/* <div className="pc8">
              <h6>Showing 1 to 10 of {product.length} entries</h6>
              <ul className="pc9">
                <button onClick={() => Prev()} className="myButton ">
                  <li>Previous</li>
                </button>

                {pages2
                  ?.slice(currentPage2 - 1, currentPage2 + 3)
                  .map((i, index) =>
                    i === pages2?.length ? (
                      ""
                    ) : (
                      <button
                        key={index}
                        onClick={() => setCurrentPage2(i)}
                        className={currentPage2 === i ? "activePage" : ""}
                      >
                        {" "}
                        {i}{" "}
                      </button>
                    )
                  )}

                <button onClick={() => Next()} className="nextBtn myButton ">
                  {" "}
                  <li>Next</li>
                </button>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceGroup;
