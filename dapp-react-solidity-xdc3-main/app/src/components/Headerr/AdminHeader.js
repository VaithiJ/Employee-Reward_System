import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./Header.css";
import ersl from "../../image/erse.png";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "../../components/url";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import del from "../Platform admin/tokkk.png";
const {
  executeTransaction,
  queryData,
  log,
  EthereumContext,
} = require("react-solidity-xdc3");

const AdminHeader = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopup, setisPopup] = useState(false);
  const [isVerSellPopup, setisVerSellPopup] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  const handleLogout = () => {
    removeCookie("access_token");
    window.open("/")
  };
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const tokenn = jwt_decode(cookies.access_token);
    console.log(tokenn);

    let account = tokenn.wallet.replace("xdc", "0x");
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    Swal.fire({
      iconHtml: `<img src=${del} style="height: 100px; width: 100px;">`,

      title: "Account Balance",

      text: `${balance.toString()}`,

      confirmButtonColor: "#9A1B56",
    });

    setSubmitting(false);
  };
  // const tokenn = jwt_decode(cookies.user_token);

  const handleAdminClick = () => {
    window.location.href = "/admin";
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
        {/* <Link to="/real">Home</Link> */}
        <Link to="/admindash"> Onboard</Link>
        <Link to="/reward"> Reward</Link>
        <Link onClick={handleLogout}>Log out</Link>
        {/* <button className="balbut" onClick={balanceOf}>Balance</button> */}
      </div>
    </nav>
  );
};

export default AdminHeader;
