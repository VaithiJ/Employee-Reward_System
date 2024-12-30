import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./Header.css";
import ersl from "../../image/erse.png";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from '../../components/url'
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopup, setisPopup] = useState(false);
  const [isVerSellPopup, setisVerSellPopup] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_token",
  ]);

  // const tokenn = jwt_decode(cookies.user_token);

  const handleAdminClick = () => {
    window.location.href="/admin";
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 0) ||
          currentScrollPos < 30
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);







  return (
    <nav className={`nav-container ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <Link to="/">
          <img  src={ersl} alt="Your Logo" className="logo-image" style={{width:"200px"}} />
        </Link>
      </div>
      <div className="sub-nav">
        <div style={{fontSize:"30px", position:"relative", left:"-500px", fontFamily:"Segoe UI"}}>Employee Reward System</div>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/login"> Employee</Link>
        <Link to="/logincomp" > Company</Link>
        <Link onClick={handleAdminClick}>Admin</Link> */}
        {/* <Link to="/contact">Contact</Link> */}
      </div>
   
   
    </nav>
  );
};

export default NavBar;
