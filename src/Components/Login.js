import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { settoken } from "../slices/loginslice";
import newImage from "./images/experts4_logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState();
  const [pass, setPass] = useState();
  const Baseurl =
    "https://vg4op6mne2.execute-api.ap-south-1.amazonaws.com/dev/";
  const dispatch = useDispatch();

  const handlelogin = async (e) => {
    console.log(userid, pass);
    try {
      let response = await axios.post(`${Baseurl}api/v1/admin/login`, {
        email: userid,
        password: pass,
      });
      console.log(response.data.accessToken, "hua");
      response = response.data.accessToken;
      localStorage.setItem("userid", response);
      dispatch(settoken(response));
      toast("Admin Login Successful", {
        position: "top-right",
      });
      navigate("/dashboard");
    } catch (e) {
      toast("Some think is wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="login">
        <div>
          <img src={newImage} width="150px" height="35px" />
        </div>
        <input
          type="text"
          placeholder="User ID"
          value={userid}
          required
          onChange={(e) => setUserid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={pass}
          required
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={(e) => handlelogin(e)}>Sign In</button>
        {/* <button onClick={()=>navigate("/dashboard")}>Sign In</button> */}
      </div>
    </>
  );
};

export default Login;
