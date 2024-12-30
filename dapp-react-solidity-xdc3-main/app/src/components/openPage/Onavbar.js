import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./onavbar.css";
import logo from "../../image/scroll-header-logo.svg";
import { Link } from "react-router-dom";

const Onavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="__navbar" style={{ background: "transparent" }}>
      <div className="__navbar-links">
        <div className="__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="__navbar-links_container">
          {/* <p>
            <Link to="/"><a>Home</a></Link>
          </p>
          <p>
            <Link to="/about">About</Link>
          </p> */}
        </div>
      </div>
      {/* <div className="__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="__navbar-menu_container scale-up-center">
            <div className="__navbar-menu_container-links">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#w">Reward System</a>
              </p>
              <p>
                <Link to="#possibility" onClick={() => setToggleMenu(false)}>
                  About
                </Link>
              </p>
              <p>
                <a href="#features">Help</a>
              </p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Onavbar;
