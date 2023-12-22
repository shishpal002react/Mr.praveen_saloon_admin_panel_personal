import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isHover, toggleHover] = React.useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };
  const [isMouse, toggleMouse] = React.useState(false);
  const toggleMouseMenu = () => {
    toggleMouse(!isMouse);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,

      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,

      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      <div className="nav1">
        <div className="nav2">
          <div onClick={() => navigate("/dashboard")}>
            <p> Dashboard</p>
          </div>
          <div>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title="Jobs"
                variant="none"
                className="custom-dropdown"
              >
                <Dropdown.Item onClick={() => navigate("/job")}>
                  Today Jobs
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/upcoming-job")}>
                  Upcoming Jobs
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/cancelled-job")}>
                  Canceled Jobs
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/offer-section")}>
                  Escalation Jobs
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/create-job")}>
                  Create Jobs
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
          <div>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title="Items"
                variant="none"
                className="custom-dropdown"
              >
                <Dropdown.Item onClick={() => navigate("/parent-category")}>
                  Parent Category
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/child-category")}>
                  Child Category
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/service-group")}>
                  Service Groups
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/service-type")}>
                  Service Types
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/services")}>
                  Services
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/packages")}>
                  Packages
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
          <div>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title="Account"
                variant="none"
                className="custom-dropdown"
              >
                <Dropdown.Item onClick={() => navigate("/service-provider")}>
                  Service Providers
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/users")}>
                  Users
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/customers")}>
                  Customers
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
          <div>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title="Masters"
                variant="none"
                className="custom-dropdown"
              >
                <Dropdown.Item onClick={() => navigate("/slots")}>
                  Slot Master
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/coupon")}>
                  Coupon Master
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/hub")}>
                  HUB Master
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
          <div>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title="Appearance"
                variant="none"
                className="custom-dropdown"
              >
                <Dropdown.Item onClick={() => navigate("/hero-banner")}>
                  Hero Banner
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/offer-section")}>
                  Offer Section
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/static-banner")}>
                  Static Banner
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
          <div>
            <p>Blogs</p>
          </div>
        </div>
        <motion.div
          className="menu-item"
          onHoverStart={toggleHoverMenu}
          onHoverEnd={toggleHoverMenu}
          // style={{ position: "relative" }}
        >
          <div className="nav3">
            <img
              className="nav3Img"
              src="https://www.experts4u.in/admin/assets/images/avatars/profile.jpg"
              alt="qewfdv"
            />
            <div className="nav4">
              <h4>Flyweis Technology</h4>
              <p>Admin</p>
            </div>
          </div>
          <motion.div
            className="sub-menu"
            initial="exit"
            animate={isHover ? "enter" : "exit"}
            variants={subMenuAnimate}
            style={{
              position: "absolute",
              right: "0%",
              background: "#fff",
              top: "100%",
              marginRight: "20px",
              marginTop: "10px",
            }}
          >
            <div className="sub-menu-background" />
            <div className="sub-menu-container">
              <div className="sub-menu-item1">Flyweis Technology </div>
              <div className="sub-menu-item2">
                <i class="fa-solid fa-user"></i>
                <p>Setting</p>
              </div>
              <div
                className="sub-menu-item2"
                style={{ marginBottom: "15px" }}
                onClick={() => navigate("/")}
              >
                <i
                  style={{ marginBottom: "15px" }}
                  class="fa-solid fa-right-from-bracket"
                ></i>
                <p style={{ marginBottom: "15px" }}>Logout</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
