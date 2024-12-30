import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import jet from "./jet.gif";
import Swal from "sweetalert2";
import del from "./tokkk.png";
import "./token.css";
import OwnerButton from "./OwnerButton";
import ersl from "../../image/erslll.png";

import Loader from "../pages/Loader.js";
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
const { executeTransaction, EthereumContext, log, queryData ,queryEvents} = require('react-solidity-xdc3');
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

const PlatformAdmin = () => {
  //   const handleRemove = (index) => {
  //     setData((prevData) => prevData.filter((_, i) => i !== index));
  //   };
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

    log("Connect", "Get Address", await signer.getAddress());
    setethereumContext({ provider, erc, account})

    setconnecting(true);
    setConnectClicked(true);

  }
  const history = useHistory();

  const [tokenMap, setTokenMap] = useState({});
  const[connectClicked, setConnectClicked] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [companyName, setcompanyName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const { provider, erc } = ethereumContext;


  console.log("sample", erc);
  console.log(provider);
  useEffect(() => {
    const walletAddress = localStorage.getItem("WalletAddress");
    if (walletAddress === "0x570AC970E766A6E16A36799913fb7C4d4D083fBc") {
      axios
        .get(`/admin`, { withCredentials: true })
        .then((response) => {
          setCompanies(response.data.comp12);
          console.log(response.data.comp12);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Please log in as an admin.",
        confirmButtonText: "Go to Admin Login",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/ownerlogin");
        }
      });
    }
  }, []);
  
  // const regCompany = async (event, company) => {
  //   event.preventDefault();

  //   try {
  //     setSubmitting(true);

  //     let companyaddress = company.walletAddress.replace("xdc", "0x");
  //     let companyname = company.comName;
  //     console.log(erc);

  //     // Register the company
  //     let resp = await executeTransaction(erc, provider, "regCompany", [
  //       companyaddress,
  //       companyname,
  //     ]);
  //     log("Registered company", "hash", resp.txHash);

  //     // If user confirmed, approve the company

  //     setSubmitting(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const verify = async (event, company) => {
    event.preventDefault();

    try {
      setShowLoader(true)
      const companyaddress = company.walletAddress.replace("xdc", "0x");
      const companyname = company.comName;

      // Register the company
      const resp = await executeTransaction(erc, provider, "regCompany", [
        companyaddress,
        companyname,
      ]);
      log("Registered company", "hash", resp.txHash);

      // Once registration is successful, update the company details on server-side
      await axios.put(
        `/verifycom/${company._id}`,
        { isAdmin: true },
        { withCredentials: true }
      );
      setShowLoader(false)
      Swal.fire({
        icon: "success",
        title: "Company Registration successful!",
        text: "You can receive tokens now.",
        confirmButtonColor: "#9A1B56",
      });

      window.location.reload();
    } catch (error) {
      if (error.code === -32603) {
        Swal.fire({
          icon: "error",
          title: "Company Registration Failed!",
          text: "Check if your wallet is connected",
          confirmButtonColor: "#9A1B56",
        }).then(() => {
          window.location.reload();
        });
      }
    }
  };

  const sendToCompany = async (event, company) => {
    try {
      setShowLoader(true);
      event.preventDefault();
      setSubmitting(true);

      // Replace the "xdc" with "0x" in the company's wallet address
      let companyAddress = company.walletAddress.replace("xdc", "0x");
      console.log("kasdlkaskdajsld", companyAddress);
      console.log("tokenss", tokenMap[companyName]);
      // Define the amount to be sent
      // let amount = "200";
      // console.log(amount);

      // try {
      // Execute the transaction
      let resp = await executeTransaction(erc, provider, "sendToCompany", [
        tokenMap[companyName],
        companyAddress,
      ]);

      // Log the transaction hash
      console.log("sending to company", "hash", resp.txHash);
      if(resp.txHash){
      setShowLoader(false);
      }
      Swal.fire({
        icon: "success",

        title: "Tokens sent successfully!",

        text: "",

        confirmButtonColor: "#9A1B56",
      });

      // Listen to the Transfer event emitted by the ercContract instance
      // erc.events.Transfer({
      //   filter: { from: myAddress, to: companyAddress },
      //   fromBlock: 0
      // })
      // .on('data', function(event) {
      //   console.log(`Token sent to ${company.name} with transaction hash: ${resp.txHash}`);
      // })
      // .on('error', function(error) {
      //   console.error(error);
      // });
      // erc.events.Transfer({}, (error, event) => {
      //   if (!error) {
      //     console.log(event.returnValues);
      //   } else {
      //     console.error(error);
      //   }
      // });
      // } catch(error) {
      //    console.error(error);
      // }
      //   erc.events.Transfer({
      //   // filter: { from: myAddress, to: companyAddress },
      //   fromBlock: 0
      // })
      // .on('data', function(event) {
      //   console.log(`Token sent to ${company.name} with transaction hash: `);
      // })
      // .on('error', function(error) {
      //   console.error(error);
      // });
      // erc.events.Transfer({}, (error, event) => {
      //   if (!error) {
      //     console.log(event.returnValues);
      //   } else {
      //     console.error(error);
      //   }
      // });

      setSubmitting(false);
    } catch (error) {
      setShowLoader(false)
      if (error.code === -32603) {
        Swal.fire({
          icon: "error",
          title: "Sending Token Failed!",
          text: "Check if your wallet is connected",
          confirmButtonColor: "#9A1B56",
        }).then(() => {
          window.location.reload();
        });
      }
    }
  };

  const transfer = async () => {
    let events = await queryEvents(erc, provider, "Transfer", 47600814);
    console.log(events);
    console.log("asassadas");
  };
  const handleTokenChange = (e, company) => {
    const newTokenMap = { ...tokenMap };
    newTokenMap[company.comName] = e.target.value;
    setcompanyName(company.comName);
    console.log("company Name", company.comName);
    setTokenMap(newTokenMap);
  };

  const logggout = () => {
    localStorage.removeItem("Wallet Address")
    history.push("/ownerlogin")
  }
  const balanceOf = async (event, company) => {
    try{
    event.preventDefault();
    setSubmitting(true);
    console.log(company);
    let account = company.walletAddress.replace("xdc", "0x");
    console.log(account);
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    Swal.fire({
      iconHtml: `<img src=${del} style="height: 100px; width: 100px;">`,

      title: "Account Balance",

      text: `${balance.toString()}`,

      confirmButtonColor: "#9A1B56",
    });

    setSubmitting(false);
  }catch(error){
    if (error.code === -32603) {
      Swal.fire({
        icon: "error",
        title: "Balance Retrieval Failed!",
        text: "Check if your wallet is connected",
        confirmButtonColor: "#9A1B56",
      }).then(() => {
        window.location.reload();
      });
    }
  }
  }
  window.onload = function () {
    alert(
      "Connect the wallet address of only the owner and check it before using"
    );
  };

 



  return (
    <div
      className="first"
      style={{
        backgroundColor: "#2051E9",
        textAlign: "center",
        overflowX: "auto",
      }}
    >
      <header style={{display:"flex", flexDirection:"row"}}>
        <Link to="/">
      <img  src={ersl} style={{width:"200px", height:"50px", marginTop:"20px", marginLeft:"10px"}}/>
      </Link>
      <h1
        style={{
          color: "white",
          fontFamily: "Montserrat",
          fontSize: "50px",
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: "30px",
          marginLeft: "150px",
          fontFamily: "Secular One",
        }}
      >
        EMPLOYEE REWARD SYSTEM
      </h1>
<button style={{height:"60px", position:"relative",left:"100px", top:"20px", borderRadius:"20px"}} onClick={logggout}>Log out</button>
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="yt"
          style={{
            fontSize: "40px",
            fontFamily: "Montserrat",
            backgroundColor: "#1196B0",
            height: "400px",
            marginLeft: "80px",
            marginTop: "80px",
            width: "500px",
            color: "white",
            borderRadius: "20px",
            boxShadow: "1px 0px 19px 5px rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ marginTop: "20px", fontFamily: "Montserrat" }}>
            Manage your platform with{" "}
            <b style={{ fontFamily: "Secular One" }}>EASE!</b>
          </div>
          <ul
            style={{
              marginTop: "40px",
              fontFamily: "Montserrat",
              fontSize: "20px",
            }}
          ></ul>
          <ul style={{ fontFamily: "Montserrat", fontSize: "20px" }}>
            Register Company to Blockchain
          </ul>
          <ul style={{ fontFamily: "Montserrat", fontSize: "20px" }}>
            Send tokens to companies
          </ul>
        </div>

        <div>
          <img style={{ marginLeft: "30px" }} src={jet} />
        </div>
      </div>
      <div >
      <div
        className="tableh"
        style={{
          margin: "0 auto",
          width: "1000px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          overflow: "auto",
          height: "auto",
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 1)",
          marginTop: "30px",
        }}
      >
        <table
          style={{
            minWidth: "100%",
            height: "auto",
            borderRadius: "20px",
            backgroundColor: "transparent",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2051E9",
                border: "",
                color: "white",
              }}
            ></tr>
            <tr
              style={{
                backgroundColor: "#2051E9",
                border: "1px solid white",
                color: "white",
              }}
            >
              <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Company Name
              </th>
              <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Wallet Address
              </th>
              <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Register
              </th>
              <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Tokens 
              </th>
              <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Balance
              </th>
              {/* <th style={{ padding: "1rem", fontFamily: "Montserrat" }}>
                Verify
              </th> */}

              {/* <th style={{ padding: "1rem" }}>Register</th> */}
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              const admin = company.isAdmin;
              console.log(admin);
              return (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td
                    style={{
                      padding: "1rem",
                      color: "white",
                      fontFamily: "Secular One",
                    }}
                  >
                    {company.comName}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      color: "white",
                      fontFamily: "Secular One",
                    }}
                  >
                    xdc....{company.walletAddress.slice(-10)}
                  </td>
                  {company.isAdmin === false ? (
                    <td style={{ padding: "1rem" }}>
                      {/* <button onClick={transfer}>Query Data</button> */}

                      <button
                        onClick={(e) => verify(e, company)}
                        style={{
                          backgroundColor: "#330078",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "0.5rem 1rem",
                          fontFamily: "Secular One",
                          transition: "0.8s",

                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "white";
                          // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                          e.target.style.boxShadow =
                          " 1px 0px 19px 5px #ffffff";                          e.target.style.color="#330078"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#330078";
                          e.target.style.border = "none";
                          e.target.style.boxShadow = "none";
                          e.target.style.color = "white"
                        }}
                      >
                        REGISTER
                      </button>
                    </td>
                  ) : (
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: "30px",
                        fontFamily: "Secular One",
                      }}
                    >
                      REGISTERED
                    </div>
                  )}
                  <td style={{ padding: "1rem", color: "white" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                      
                        // className="inputbox"
                        key={index}
                        placeholder="Tokens"
                        type="number"
                        min="0"
                        inputMode="numeric"
                        // placeholder="Enter number of tokens"
                        style={{
                          marginRight: "1rem",
                          width: "80px",
                          height: "30px",
                          backgroundColor: "#330078",
                          color : "white"
                        }}
                        onChange={(e) => handleTokenChange(e, company)}
                        value={tokenMap[company.comName] || ""}
                      />

                      <button
                        className="button1"
                        style={{
                          backgroundColor: "#330078",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "0.5rem 1rem",
                          fontSize: "1rem",
                          position: "relative",
                          overflow: "hidden",
                          zIndex: "1",
                          fontFamily: "Secular One",
                          transition: "0.5s",

                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "white";
                          // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                          e.target.style.boxShadow =
                            " 1px 0px 19px 5px #ffffff";
                          e.target.style.color = "#330078"
                          e.target.style.transition= "0.5s"

                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#330078";
                          e.target.style.border = "none";
                          e.target.style.boxShadow = "none";                          e.target.style.color = "white"

                        }}
                        onClick={(e) => sendToCompany(e, company)}
                        

                      >

                        

                        <span
                          style={{
                            content: "''",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#1e9bff",
                            zIndex: "-8",
                            transform: "scale(0)",
                            transition: "0.8s",
                          }}
                        ></span>
                        Reward
                      </button>
                      
                    </div>

                  </td>
                  
                  {/* {showLoader && (
          <div style={{

            position: "fixed",
            
             top: 0,
            
            left: 0,
            
             width: "100vw",
 height: "100vh",
            
            background: "rgba(255, 255, 255, 0.8)",
            
             display: "flex",
            
          justifyContent: "center",
        alignItems: "center",
            
            zIndex: 9999,
            
             }}><Loader/></div>
        )} */}
                  <td style={{ padding: "1rem" }}>
                    <button
                      onClick={(e) => balanceOf(e, company)}
                      style={{
                        backgroundColor: "#330078",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontFamily: "Secular One",
                        transition: "0.8s",

                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "white";
                        // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                        e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                        e.target.style.color = "#330078"
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#330078";
                        e.target.style.border = "none";
                        e.target.style.boxShadow = "none";  
                        e.target.style.color = "white"

                      }}
                    >
                      BALANCE
                    </button>
                  </td>
                  {/* <td style={{ padding: "1rem" }}>
                  {admin ? <p style={{color:"#00FF00"}}><b> VERIFIED </b> </p> : (
                  <button
                    onClick={() => Verify(company)}
                    style={{
                      backgroundColor: "#00FFFF",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Verify
                  </button>
                  
                  
                )} 
                </td> */}
                  {/* <td style={{ padding: "1rem" }}>
                     <button onClick={transfer}>Query Data</button> 

                    <button
                      onClick={(e) => regCompany(e, company)}
                      style={{
                        backgroundColor: "#FA0000",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontFamily: "Montserrat",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#16FF00";
                        e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                        e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#FA0000";
                        e.target.style.border = "none";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Register
                    </button>
                  </td> */}
               
                </tr>
              );
            })}
          </tbody>
        </table>

        </div>
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

}} ><Loader  /></div>)}

      </div>
      
    </div>
  );
};

export default PlatformAdmin;
