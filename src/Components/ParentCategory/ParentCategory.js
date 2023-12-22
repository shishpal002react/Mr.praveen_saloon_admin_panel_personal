import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AddCategory from "./AddCategory";
import "bootstrap/dist/css/bootstrap.min.css";
import Editparent from "./Editparent";
import axios from "axios";

const ParentCategory = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [product, setProduct] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [notice, setNotice] = useState();
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();
  const [status, setStatus] = useState();

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
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
      setProduct(data.reverse());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleeditclick = (item) => {
    setName(item.name);
    // console.log(item.name);
    setStatus(item.status);
    setEditShow(true);
    setId(item._id);
    setNotice(item.notice);
    // console.log(item._id, "id");
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

  return (
    <>
      <AddCategory
        show={show}
        onHide={() => setShow(false)}
        setShow={setShow}
        getdata={getdata}
      />
      <Editparent
        show={editshow}
        onHide={() => setEditShow(false)}
        getdata={getdata}
        setEditShow={setEditShow}
        status={status}
        catid={id}
        name={name}
        notice={notice}
      />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Parent Category</h5>
          <button onClick={() => setShow(true)}>New Category</button>
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
                  <th className="th2">
                    <i class="fa-solid fa-image"></i>
                  </th>
                  <th className="th3">Category</th>
                  <th className="th4">Notice</th>
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
                        <img src={item.image} className="parentImg" />
                      </td>
                      <td>
                        {" "}
                        <h6>{item.name}</h6>
                      </td>
                      <td>
                        <h6>
                          {item?.notice !== undefined ? item?.notice : " "}
                        </h6>
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
                            onClick={() => handleeditclick(item)}
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
    </>
  );
};

export default ParentCategory;
