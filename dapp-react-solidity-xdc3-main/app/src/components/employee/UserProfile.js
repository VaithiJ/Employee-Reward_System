
import React, { useState, useEffect, useContext, useRef } from "react";
import "./task.css"
import Footercr from "../footer/footercr";
import { useCookies } from "react-cookie";
import Header from "../Headerr/Header";
import dotenv from "dotenv"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Table } from "react-bootstrap";
import SidebarMenu12 from "./side1";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import { storage } from "../../firebase.js"
import Swal from "sweetalert2"
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
dotenv.config();
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');
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
const AWS = require('aws-sdk');
const crypto = require('crypto');
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_NAME
});

const ProfilePage = (props) => {
  const [connecting, setconnecting] = useState(false);

   
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);

  const connect = async (event) => {
    console.log("Clicked")
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const erc = await createContractInstance(address, abi, provider);
    const account = await signer.getAddress();
    localStorage.setItem("WalletAddress", account);

    setethereumContext({ provider, erc, account})
    log("Connect", "Get Address", await signer.getAddress());
    setconnecting(true);
    setConnectClicked(true);

  }
  const [progressWidth, setProgressWidth] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["employee_token",
    "name",]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [award, setaward] = useState([]);
  const [awardHistoryVisible, setAwardHistoryVisible] = useState(false);

  const [tokenHistoryVisible, setTokenHistoryVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hashh, setHash] = useState("");
  const[connectClicked, setConnectClicked] = useState(false);

  const handleTokenHistoryClick = () => {
    setTokenHistoryVisible(!tokenHistoryVisible);
    setAwardHistoryVisible(false);
  };

  const { provider, erc } = ethereumContext;
  console.log("sample", erc)
  const handlePursuingClick = () => {
    if (progressWidth < 100) {
      setProgressWidth(progressWidth + 10);
    }
  };
  const getCertificate = async (token, hashh) => {
    let taskId = (token._id).slice(-5);
    console.log(taskId);
    setSubmitting(true);

    // Call the API to get the hash
    let response = await queryData(erc, provider, 'getFileHash', [taskId]);
    log("Returned hash", "hash", response);
    setHash(response);

    // Call the listFiles API to download the file
    const url = `http://localhost:8800/listFiles?employeeName=${toke.name}&hash=${response}`;
    const newWindow = window.open(url, '_blank');

    // Wait for the new window to load before setting submitting to false
    newWindow.onload = () => {
      setSubmitting(false);
    };
  };
  const ShareCertificate = async (token, hashh) => {
    let taskId = (token._id).slice(-5);
    console.log(taskId);
    setSubmitting(true);

    // Call the API to get the hash
    let response = await queryData(erc, provider, 'getFileHash', [taskId]);
    log("Returned hash", "hash", response);
    setHash(response);
console.log(toke)
    // Call the listFiles API to download the file
    const url = `http://localhost:3001/listFiles?employeeName=${toke.name}&hash=${response}&tokencomp=${token.companyName}&tokentask=${token.task}&tokendead=${token.rewards}`;
console.log(url)
Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-secondary',
  },
  buttonsStyling: false,
  input: 'text',
  inputAttributes: {
    readonly: true,
  },
  inputValue: url,
  confirmButtonText: 'Copy',
  showCancelButton: true,
}).fire({
  icon: 'success',
  title: 'Copy the link to share!',
  inputValidator: (value) => {
    // Validate the input value if needed
    if (!value) {
      return 'You need to enter a value';
    }
  },
}).then((result) => {
  if (result.isConfirmed) {
    const inputField = Swal.getInput();
    inputField.select();
    document.execCommand('copy');
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

    // Wait for the new window to load before setting submitting to false
    
  };

  const getAwardCertificate = async (token, hashh) => {
    let taskId = (token._id).slice(-5);
    console.log(taskId);
    setSubmitting(true);

    // Call the API to get the hash
    let responseee = await queryData(erc, provider, 'getAwardHash', [toke.name]);
    log("Returned hash", "hash", responseee);
    setHash(responseee);

    // Call the listFiles API to download the file
    const url = `http://localhost:8800/listAwards?employeeName=${toke.name}&hash=${responseee}`;
    const newWindow = window.open(url, '_blank');

    // Wait for the new window to load before setting submitting to false
    newWindow.onload = () => {
      setSubmitting(false);
    };
  };
  const [showButton, setShowButton] = useState(false);
  const [delay, setDelay] = useState(200);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [red, setred] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleLogout = () => {
    removeCookie("employee_token");
  };


  const handleAwardHistoryClick = () => {
    setAwardHistoryVisible(!awardHistoryVisible);
    setTokenHistoryVisible(false);
  };;


  const setemployees = (data) => {
    setEmployees(data)
    console.log('function', employees)
  }
  const uploadFile = (fileUpload) => {
    if (fileUpload == null) return;
    const fileName = fileUpload.name + uuidv4();
    const fileRef = ref(storage, `UserProfile/${toke.name}/${fileName}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { name: fileName, url: url }]);
        setAvatarUrl(url);
        const red = fileName;
        console.log(fileName);

        axios
          .put(
            `/updateprofile/${toke.name}`,
            { profile: fileName },
            { withCredentials: true }
          )
          .then((response) => {
            const updated = response.data.updatedprofile;

          });
      });
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.put(`/updateprofile/${toke.name}`);
        const red = response.data.updatedprofile;
        setred(red);

        const storageRef = ref(storage, `UserProfile/${toke.name}`);
        const listResult = await listAll(storageRef);

        const itemRef = listResult.items.find((ref) => ref.name === red.profile);
        if (itemRef) {
          const url = await getDownloadURL(itemRef);
          setAvatarUrl(url);
          console.log("What is the url", url)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);


  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = (event) => {
    // Check if the mouse has moved over the button
    const relatedTarget = event.relatedTarget;
    const button = document.querySelector("button");
    if (button && button.contains(relatedTarget)) {
      return;
    }

    // If the mouse is not over the button, hide the button
    setDelay(700); // set a delay of 200ms
    setTimeout(() => {
      setShowButton(false);
    }, delay);
  };

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      uploadFile(file);
    });
    input.click();
  };

  const toke = jwt_decode(cookies.employee_token);
  console.log(toke)
  useEffect(() => {
    axios
      .get(`/getawards`, { withCredentials: true })
      .then((response) => {
        setaward(
          response.data.reee.filter((reee) => reee.emp === (toke.name))

        );
        console.log(response.data.reee);
      })
      // const red= response.data.tasks.filter((tasks) => tasks.empName == toke.name)
      // console.log(rd)
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const tokee = jwt_decode(cookies.employee_token);
  console.log(toke)
  useEffect(() => {
    axios
      .get(`/viewtask`, { withCredentials: true })
      .then((response) => {
        setTasks(
          response.data.tasks.filter((tasks) => tasks.empName === (tokee.name) && tasks.status === "Rewarded")

        );
        console.log(response.data.tasks);
      })
      // const red= response.data.tasks.filter((tasks) => tasks.empName == toke.name)
      // console.log(rd)
      .catch((error) => {
        console.log(error);
      });

  }, []);
  console.log(tasks);
  useEffect(() => {
    axios
      .get(`/comemps`, { withCredentials: true })
      .then((response) => {
        setemployees(response.data.details.filter((details) => details.Name === toke.name));

      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  return (
    <div style={{ height: "auto", backgroundColor: '#F9F8F8' }}>
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center'
      }}>  <div style={{ display: "flex", position: "relative", bottom: "10px" }}> <SidebarMenu12 /></div>
        <img src={avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s'} alt="User Avatar" style={{
          borderRadius: '50%',
          marginRight: '20px',
          width: "50px",
          height: "50px",
          position: "relative",
          left: "40px"

        }} />
        <p style={{
          margin: '0',
          fontSize: '16px',
          color: '#000000',
          position: "relative",
          left: "40px",
          fontFamily: "Segoe UI"

        }}>{toke.name}</p>
       <h1 style={{
  margin: '0',
  fontSize: '35px',
  fontWeight: 'bold',
  color: '#0F6292',
  flex: 4,
  textAlign: "center",
  position: "relative",
  right: "80px",
  color: "#000000",
  fontFamily: "Segoe UI" // Changed font family to "sans-serif"
}}>

          USER PROFILE</h1>
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
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s'}
            alt="User Avatar"
            style={{
              border: "3px solid #ccc",
              boxShadow: "0px 0px 10px #ccc",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              zIndex: 1,
              position: "relative",
              top: "8px",
              left: "10px"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {showButton && (
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              style={{
                position: "absolute",
                top: "80%",
                left: "60%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#007bff",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                border: "none",
                boxShadow: "0px 0px 10px #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              Edit
            </button>
          )}
        </div>
        {/* <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
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
        /> */}

        <div
          className="red"
          style={{
            flexDirection: "column",
            position: "relative",
            top: "35px",
            left: "30px",
            display: "flex",
          }}
        >
          <p style={{ display: "flex", alignItems: "center" }}>
            <b style={{ color: "#212354", marginRight: "10px", fontFamily: "Segoe UI" }}>
              Name:
            </b>
            <span style={{ color: "#000000", fontFamily: "Segoe UI" }}>{toke.name}</span>
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            <b style={{ color: "#212354", marginRight: "10px", fontFamily: "Segoe UI" }}>
              Wallet:
            </b>
            <span style={{ color: "#000000", fontFamily: "Segoe UI" }}>{toke.wallet}</span>
          </p>
        </div>
      </div>
      <div className="card000">
        {/* <div> */}
          <div
            onClick={handleTokenHistoryClick}
            style={{
              position: "relative",
              bottom: "-18px",
              left: "680px",
              height: "20%",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ":hover": {
                transform: "scale(1.2)",
                background: "#FFFFFF",
                fontFamily: "Segoe UI"
              },
            }}
          >
            <b style={{ fontFamily: "Segoe UI", color: "#212354" }}>Token History{" "} </b>
            <IoIosArrowDropdownCircle style={{ fontSize: "30px", color: "#212354" }} />
          </div>
          {tokenHistoryVisible && (
          <div
            className="Acheivements"
            style={{
              marginLeft: "200px",
              position: "absolute",
              top: "65px",
              right:"1px",
              borderRadius: "20px",
              maxHeight: "300px",  // Set a fixed height for the table container
              overflow: "auto",
            }}
          >
            <div style={{ textAlign: "center", height: "40px" }}>
              <h6>
                <p
                  style={{
                    fontSize: "1.4rem",
                    textAlign: "center",
                    position: "relative",
                    top: "10px",
                    left: "15px",
                  }}
                >
                  {" "}
                  <b style={{ color: "#212354", padding: "40px", fontFamily: "Segoe UI" }}>
                    Token History
                  </b>{" "}
                </p>
              </h6>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                    Company Name
                  </th>
                  <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                    Rewarded Tasks
                  </th>
                  <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>Completion Date</th>
                  {/* <th style={{ color: "#212354", textAlign: "center" }}>
                  Deadline
                </th> */}
                 
                  <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                    Certificates
                  </th>
                  <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                    Share Certificates
                  </th>
                </tr>
              </thead>
              <tbody>
  {tasks.map((token, index) => (
    <tr key={index}>
      <td style={{ fontFamily: "Segoe UI" }}>{token.companyName}</td>
      <td style={{ fontFamily: "Segoe UI" }}>{token.task}</td>
      <td align="center" style={{ fontFamily: "Segoe UI" }}>{token.deadline}</td>
      <td align="center">
        {connectClicked ? (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: "Segoe UI"
          }} onClick={() => getCertificate(token)}
          > View</button>
        ) : (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'lightgrey',
            color: 'grey',
            border: 'none',
            borderRadius: 'n',
            cursor: 'not-allowed',
            fontFamily: "Segoe UI"
          }} disabled={true}
          > View</button>
        )}
      </td>
      <td align="center">
        {connectClicked ? (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: "Segoe UI"
          }} onClick={() => ShareCertificate(token)}
          > Share</button>
        ) : (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'lightgrey',
            color: 'grey',
            border: 'none',
            borderRadius: 'n',
            cursor: 'not-allowed',
            fontFamily: "Segoe UI"
          }} disabled={true}
          > Share</button>
        )}
      </td>
    </tr>
  ))}
</tbody>

            </Table>
          </div>
        )}
      {/* </div> */}
      </div> 
      <div
        onClick={handleAwardHistoryClick}
        style={{
          position: "relative",
          top: "225px",
          left: "600px",
          height: "20%",
          width: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          ":hover": {
            transform: "scale(1.2)",
            background: "#FFFFFF",
            fontFamily: "Segoe UI",

          },
        }}
      >
        <b style={{ fontFamily: "Segoe UI", position: "relative", bottom: "325px", right: "250px", marginTop: "90px", marginLeft: "-120px", color: "#212354" }}>Award History{" "} </b>
        <IoIosArrowDropdownCircle style={{ fontSize: "30px", position: "relative", bottom: "304px", right: "250px", marginTop: "50px", color: "#212354" }} />
      </div>


      {awardHistoryVisible && (
        <div
          className="Acheivements"
          style={{
            marginLeft: "238px",
            position: "relative",
            bottom: "70px",
            borderRadius: "20px",
            maxHeight: "300px",  // Set a fixed height for the table container
              overflow: "auto",
          }}
        >
          <div style={{ textAlign: "center", height: "40px" }}>
            <h6>
              <p
                style={{
                  fontSize: "1.4rem",
                  textAlign: "center",
                  position: "relative",
                  top: "50px",
                  left: "15px",
                }}
              >
                {" "}
                <b style={{ color: "#212354", padding: "40px", fontFamily: "Segoe UI", position: "relative", bottom: "40px" }}>
                  Award History
                </b>{" "}
              </p>
            </h6>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                  Company Name
                </th>
                <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                  Award Name
                </th>
                <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>Award Date</th>
                {/* <th style={{ color: "#212354", textAlign: "center" }}>
                  Deadline
                </th> */}
                
                <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                  Certificates
                </th>
                <th style={{ color: "#212354", textAlign: "center", fontFamily: "Segoe UI" }}>
                  Share Certificate
                </th>
              </tr>
            </thead>
            <tbody>
  {award.map((token, index) => (
    <tr key={index}>
      <td style={{ fontFamily: "Segoe UI" }}>{token.compname}</td>
      <td style={{ fontFamily: "Segoe UI" }}>{token.awardname}</td>
      <td align="center" style={{ fontFamily: "Segoe UI" }}>{token.awarddate}</td>
      {/* <td align="center">{token.rating}</td> */}
      <td align="center">
        {connectClicked ? (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: 'n',
            cursor: 'pointer',
            fontFamily: "Segoe UI"
          }} onClick={() => getAwardCertificate(token)}
          > View</button>
        ) : (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'lightgrey',
            color: 'grey',
            border: 'none',
            borderRadius: 'n',
            cursor: 'not-allowed',
            fontFamily: "Segoe UI"
          }} disabled={true}
          > View</button>
        )}
      </td>
      <td align="center">
        {connectClicked ? (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: 'n',
            cursor: 'pointer',
            fontFamily: "Segoe UI"
          }} onClick={() => getAwardCertificate(token)}
          > Share</button>
        ) : (
          <button style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: 'lightgrey',
            color: 'grey',
            border: 'none',
            borderRadius: 'n',
            cursor: 'not-allowed',
            fontFamily: "Segoe UI"
          }} disabled={true}
          > Share</button>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </Table>
        </div>

      )}
      <div
        className="card1"
        style={{
          marginLeft: "238px",
          position: "relative",
          // marginTop:"140px",
          top: tokenHistoryVisible ? '260px' : '-50px',
          textAlign: "center",
          borderRadius: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h6>
            <b style={{ fontSize: "1.4rem", color: "#212354", fontFamily: "Segoe UI" }}>INFORMATION</b>
          </h6>{" "}
        </div>
        <hr className="mt-0 mb-4" />
        <div className="row pt-1">
          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }} >
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Name:</h6>
            <p className="text-muted  mb-6" style={{ fontFamily: "Segoe UI" }}>{toke.name}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Email:</h6>
            <p className="text-muted mb-6" style={{ fontFamily: "Segoe UI" }}>{toke.email}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Phone:</h6>
            <p className="text-muted  mb-6" style={{ fontFamily: "Segoe UI" }}>{toke.mobile}</p>
          </div>

          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Address:</h6>
            <p className="text-muted mb-0" style={{ fontFamily: "Segoe UI" }}>{toke.address}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Wallet:</h6>
            <p className="text-muted  mb-6" style={{ fontFamily: "Segoe UI", position: "relative", right: "7px" }}>{toke.wallet}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
            <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>ID:</h6>
            <p className="text-muted  mb-6" style={{ fontFamily: "Segoe UI" }}>{toke.id}</p>
          </div>
        </div>
        <div style={{ marginTop: "80px" }}>
          <div style={{ textAlign: "center" }}>
            <h6>
              <b
                style={{
                  fontSize: "1.4rem",
                  color: "#212354",
                  textAlign: "center"
                  , fontFamily: "Segoe UI"
                }}
              >
                COMPANY
              </b>
            </h6>
          </div>
          <hr className="mt-0 mb-4" />
          {employees.map((emp) => (<div className="row pt-1">
            <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
              <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>Company Name:</h6>
              <p className="text-muted mb-0" style={{ fontFamily: "Segoe UI" }}>{emp.comName}</p>
            </div>
            <div className="col-6 mb-3 d-flex align-items-left" style={{ position: "relative", left: "50px" }}>
              <h6 style={{ color: "#212354", marginRight: "20px", fontFamily: "Segoe UI" }}>EmployeeId:</h6>
              <p className="text-muted mb-0" style={{ fontFamily: "Segoe UI" }}>{emp.comId}</p>
            </div>
          </div>))}

        </div>

      </div>

      <div></div>
      {/* <footer >  © All Rights Reserved | 2023 SecurekloudTechnologies. </footer> */}

    </div>
  );
};
export default ProfilePage;