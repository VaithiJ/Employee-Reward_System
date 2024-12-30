import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SidebarMenu from "./side";
import { AccountCircle, GitHub, Language, Twitter } from "@material-ui/icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "../url.js"
import { Link, useHistory } from "react-router-dom";
import Loader from "../pages/Loader.js";

import Swal from "sweetalert2";
import "./real.css"
import Footercr from "../footer/footercr";
import LogoutHeader from "../header/logoutheader";
import { storage } from "../../firebase.js"
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
dotenv.config()
const { getWeb3Modal, createWeb3Provider, connectWallet, createContractInstance } = require('react-solidity-xdc3');
var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network",
    888 : "http://13.234.98.154:8546"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}
const nodemailer = require('nodemailer');
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');
const ProfilePage = (props) => {
  const [connecting, setconnecting] = useState(false);
  const[connectClicked, setConnectClicked] = useState(false);

   
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);

  const connect = async (event) => {
    console.log("Clicked")
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const erc = await createContractInstance(address, abi, provider);
    const account = await signer.getAddress();
    localStorage.setItem("WalletAddress", account.toLowerCase());

    setethereumContext({ provider, erc, account})
    log("Connect", "Get Address", await signer.getAddress());
    setconnecting(true);
    setConnectClicked(true);

  }
  const [progressWidth, setProgressWidth] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  const history = useHistory();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [red, setred] = useState([]);
  const [m, setm] = useState("")
  // const [comName, setComName] = useState(" ");
  // const [comId, setComId] = useState(" ");
  const [employee, setEmployee] = useState([]);
  // const API_URL = "http://65.2.3.121:8800";
  const employeeId = props.match.params._id;
  const employeeName = employee.name;
  const employeeAddress = employee.address;
  const employeeMobile = employee.mobile;
  const employeeEmail = employee.email;
  const employeeWallet = employee.wallet;
  const profile11 = employee.profile;
  console.log("aksjdakjsdkasdjasd", employeeMobile);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = ethereumContext;
  console.log("sample", erc)
  // console.log("sdfgjhfsdghfdsghd",respo.data);
  // console.log("sdfgjhfsdghfdsghd",respo.data);
  window.onload = function () {
    alert("\n• Please connect your company wallet address ");
  }
  // console.log("comName:",comName);
  // console.log("comId:",comId);
  console.log("employee id:", employeeId);
  console.log("name: ", employeeName);
  console.log("address: ", employeeAddress);
  console.log("email: ", employeeEmail);
  console.log("mobile: ", employeeMobile);
  console.log("wallet: ", employeeWallet);
  console.log("profile: ", profile11);
  // console.log(response.data);
  const [same, setSame] = useState(false);
  const sameAdd = () => {
    // console.log(tokenn.wallet.replace("xdc", "0x"));
    const ls = localStorage.getItem("WalletAddress");
    const sl = ls.toLowerCase();
    console.log(sl);
    if (tokenn.wallet.replace("xdc", "0x") === ls) {
      setSame(true);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      sameAdd();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const tokenn = jwt_decode(cookies.access_token);
  const comName = tokenn.name;
  const comId = tokenn.name.substr(0, 3).toUpperCase() + employeeId.substr(-6);
  const getAllEmployees = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let employeeaddress = employee.wallet.replace("xdc", "0x");
    let response1 = await queryData(erc, provider, 'getAllEmployees', [employeeaddress]);
    log("submitClaim", "hash", response1)
    setSubmitting(false);
  }
  const regEmployee = async () => {
    sameAdd()
    if (same == true) {

      try {
        setShowLoader(true)
        let employeeaddress = employee.wallet.replace("xdc", "0x");
        let employeename = employee.name;
        console.log("name", employeename);
        let resp = await executeTransaction(erc, provider, "regEmployee", [
          employeeaddress, employeename

        ]);
        log("Registered Employee", "hash", resp.txHash);
        setShowLoader(false)
        setSubmitting(false);
        const respo = await axios.get(`/onboard/${employeeId}`, {
          withCredentials: true,
        });
        console.log("asasdasdasdasdsaasdasssssssssssss", respo);

        const response = await axios.post(
          `/addemployee/${employeeId}/${employeeName}/${employeeAddress}/${employeeMobile}/${employeeEmail}/${employeeWallet}/${profile11}`,
          {
            comName,
            comId,
          },
          { withCredentials: true }
        );
        setSubmitting(true);

        Swal.fire({
          icon: "success",
          title: "Employee Added Successfully",
          text: `${employeeName} has been added`,
          confirmButtonColor: "#9A1B56",
        })
        history.push("/real")
      } catch (error) {
        setShowLoader(false)
        Swal.fire({
          icon: "error",
          title: "Check Wallet Address",
          confirmButtonColor: "#9A1B56",
        });
        if (error.response) {
          console.error("Error response: ", error.response.data);
        } else if (error.request) {
          console.error("Error request: ", error.request);
        } else {
          console.error("Error message: ", error.message);
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Onboarding Failed",
        text: `This is not ${comName}'s wallet address`,
        confirmButtonColor: "#9A1B56",
      })
    }
  }



  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        console.log(employeeName)
        const response = await axios.put(`/updateprofile/${employeeName}`);
        const red = response.data.updatedprofile;
        setred(red);

        const storageRef = ref(storage, `UserProfile/${employeeName}`);
        const listResult = await listAll(storageRef);

        const itemRef = listResult.items.find((ref) => ref.name === red.profile);
        if (itemRef) {
          const url = await getDownloadURL(itemRef);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [employeeName]);

  useEffect(() => {
  
    axios
      .get(`/empprofile/${employeeId}`, { withCredentials: true })

      // make a GET request to the server
      .then((response) => {
        //console.log(response.data.user);
        setEmployee(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);
  const onboarded = employee.isOnboarded;
  console.log("vanthura", onboarded);
  // console.log("heyy",employee)
  return (
    <div className="topp" style={{ height: "auto" }}>
      <header
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <div style={{ display: "flex", position: "relative", bottom: "10px" }}>
          {" "}
          <SidebarMenu />
        </div>
        <h1
          style={{
            margin: "0",
            marginLeft: "-120px",
            fontSize: "35px",
            fontWeight: "bold",
            color: "#0F6292",
            flex: 4,
            textAlign: "center",
            position: "relative",
            left: "30px",
            fontFamily: "Secular One"
          }}
        >
          EMPLOYEE PROFILE
        </h1>

        <button
  style={{
    position: "relative",
    marginLeft: "150px",
    height: "60px",
    marginTop: "20px",
    borderRadius: "20px",
    background: connectClicked ? "blue" : "",
    cursor: connectClicked ? "not-allowed" : "pointer"
  }}
  onClick={connect}
  disabled={connectClicked}
>
  {connectClicked ? "Connected" : "Connect"}
</button>       
      </header>
      <div style={{ backgroundColor: "#F9F8F8" }}>
        <div
          className="card"
          style={{
            width: "900px",
            height: "140px",
            flexDirection: "row",
            background: "#FFFFFF",
            margintop: "100px",
            position: "relative",
            top: "30px",
            left: "240px",
          }}
        >
          <img
            src={avatarUrl || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
            alt="Avatar"
            style={{
              border: "3px solid #ccc",
              boxShadow: "0px 0px 10px #ccc",
              borderRadius: "50%",
              marginLeft: "5%",
              width: "120px",
              height: "120px",
              position: "relative",
              top: "10px",
            }}
          />

          <div
            className="red"
            style={{
              flexDirection: "column",
              position: "relative",
              top: "35px",
              left: "30px",
              flexDirection: "column",
              display: "flex"
            }}
          >
            <p style={{ display: "inline-block", fontFamily: "Secular One", marginLeft: "-0px", position: "relative", display: "flex" }}>
              <b style={{ color: "#537FE7", display: "inline", fontFamily: "Secular One" }}>Name :  </b>{" "}
              <span style={{ color: "#000000", fontFamily: "Secular One", position: "relative", left: "18px" }}>{employee.name}</span>
            </p>
            <p style={{ fontFamily: "Secular One", display: "flex" }}>
              {" "}
              <b style={{ color: "#537FE7", fontFamily: "Secular One" }}> Wallet : </b>{" "}
              <span style={{ color: "#000000", fontFamily: "Secular One", position: "relative", left: '10px' }}>{employee.wallet}</span>
            </p>
          </div>
        </div>
        <div
          className="card1"
          style={{
            marginLeft: "238px",
            position: "relative",
            top: "50px",
            textAlign: "center",
            borderRadius: "20px",
            height: "300px"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h6>
              <b style={{ fontSize: "1.4rem", color: "#537FE7", fontFamily: "Secular One" }}>INFORMATION</b>
            </h6>{" "}
          </div>
          <hr className="mt-0 mb-4" />
          <div className="row pt-1">
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily: "Secular One" }}>Name:</h6>
              <p className="text-muted  mb-6" style={{ fontFamily: "Secular One" }}>{employee.name}</p>
            </div>
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily: "Secular One" }}>Email:</h6>
              <p className="text-muted mb-6" style={{ fontFamily: "Secular One" }}>{employee.email}</p>
            </div>
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px", fontFamily: "Secular One" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily: "Secular One" }}>Phone:</h6>
              <p className="text-muted  mb-6" style={{ fontFamily: "Secular One" }}>{employee.mobile}</p>
            </div>

            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily: "Secular One" }}>Address:</h6>
              <p className="text-muted mb-0" style={{ fontFamily: "Secular One" }}>{employee.address}</p>
            </div>
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px", marginLeft: "-20px" }}
            >
              <h6 className="walad" style={{ color: "#537FE7", position: "relative", fontFamily: "Secular One", left: "18px" }}>
                Wallet :
              </h6>
              <p className="walad" style={{ color: "#6C7592", fontFamily: "Secular One", position: "relative", left: "30px" }}>{employee.wallet}</p>
            </div>
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px", marginLeft: "20px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily: "Secular One" }}>ID:</h6>
              <p className="text-muted  mb-6" style={{ fontFamily: "Secular One" }}>{employee._id}</p>
            </div>
          </div>
          <div className="butad">
            <div

              style={{
                position: "relative",
                bottom: "10px",
                left: "930px",
                bottom: "100px",
                height: "20%",
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                ":hover": {
                  transform: "scale(10)",
                  background: "#330078",
                  display: "flex"
                },
              }}
            >
             {!connectClicked && !onboarded && (
  <CardActions>
    <Button
      onClick={regEmployee}
      variant="contained"
      color="primary"
      style={{
        margin: "1rem",
        position: "relative",
        bottom: "48px",
        width: "170px",
        right: "30px",
        height: "50px",
        marginTop: "150px",
        marginLeft: "-630px",
        display: "flex"
      }}
      disabled={!connectClicked} // Disable the button when connectClicked is false
    >
      <AiOutlineUserAdd
        style={{
          width: "30px",
          height: "30px",
          position: "relative",
          left: "0px",
          bottom:'2px'
        }}
      />{" "}
      <a>
        {" "}
        <b> Add Employee </b>{" "}
      </a>
    </Button>
  </CardActions>
)}

            </div>
          </div>

        </div>
        <div className="butad">
          
          {showLoader && (<div style={{

            position: "fixed",

            top: 0,

            left: 0,

            width: "100vw",

            height: "100vh",

            background: "rgba(0, 0, 0, 0.4)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 9999,

          }} ><Loader /></div>)}

        </div>

      </div>

      <div></div>

      {/* <Footercr/> */}
    </div>
  );
};

export default ProfilePage;

