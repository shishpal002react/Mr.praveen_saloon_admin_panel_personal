import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AddCategory from "./AddCategory";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Editchild from "./Editchild";

const ChildCategory = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [product, setProduct] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState();
  const [query, setQuery] = useState("");
  const [productSize, setProductSize] = useState();

  // Edit category id
  const [pCate, setPCat] = useState("");
  const [childcat, setChildCat] = useState("");
  const [notice, setNotie] = useState("");
  const [catImage, setCatImage] = useState("");
  const [item, setItem] = useState();
  const [status, setStatus] = useState();
  const [color, setColor] = useState("");

  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/Category/getAllCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data, "child data");
      setProduct(data.reverse());
    } catch {}
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleeditclick = (item) => {
    setPCat(item.mainCategoryId._id);
    setChildCat(item.name);
    setNotie(item.notice);
    setCatImage(item.image);
    setEditShow(true);
    setId(item._id);
    setName(item.name);
    setItem(item);
    setStatus(item.status);
    setColor(item.colour);
    console.log(item._id, "id");
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
        getdata={getdata}
      />
      <Editchild
        pCate={pCate}
        childcat={childcat}
        show={editshow}
        notice={notice}
        catImage={catImage}
        onHide={() => setEditShow(false)}
        getdata={getdata}
        status={status}
        id={id}
        item={item}
        name={name}
        color={color}
      />
      <Navbar />
      <div className="pc1">
        <div className="pc2">
          <h5>Category</h5>
          <button onClick={() => setShow(true)}>Add Category</button>
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
                  <th className="th3">P.Category</th>
                  <th className="th3">Category</th>
                  <th className="th4">Notice</th>
                  {/* <th className="th4">color</th> */}
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
                        <img src={item?.image} className="childImg" />
                      </td>
                      <td>
                        <h6>{item?.mainCategoryId?.name}</h6>
                      </td>
                      <td>
                        <h6>{item?.name}</h6>
                      </td>
                      <td>
                        <h6>{item.notice}</h6>
                      </td>
                      {/* <td>
                        <h6
                          style={{
                            backgroundColor: `${item.colour}`,
                            height: "20px",
                            width: "30px",
                          }}
                        ></h6>
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

export default ChildCategory;
