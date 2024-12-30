import React, { useState, useEffect, useContext } from "react";
import "./CreateModal.css";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "../url.js";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import { useHistory } from "react-router-dom";
import bg from "./ss.svg";
import "./real.css";
import awarddd from "./awd.png";
import "./reg.css";
import Swal from "sweetalert2";
import Loader from "../pages/Loader.js";
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
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


const Award = (props) => {
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
    localStorage.setItem("WalletAddress", account.toLowerCase());

    setethereumContext({ provider, erc, account})
    log("Connect", "Get Address", await signer.getAddress());
    setconnecting(true);
    setConnectClicked(true);

  }
  const { provider, erc } = ethereumContext;

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const tokenn = jwt_decode(cookies.access_token);
  const history = useHistory();

  const employeeName = props.match.params.Name;
  const employeeAddress = props.match.params.Wallet.replace("xdc", "0x");
  console.log(employeeAddress);
  const compName = tokenn.name;

  const [submitting, setSubmitting] = useState(false);
  const [hash, setHash] = useState("");

  const [showLoader, setShowLoader] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);
  const[connectClicked, setConnectClicked] = useState(false);

  const uploadFile = async () => {
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
    const confirmUniqueName = window.confirm(
      "Does the certificate have a unique name?"
    );
    const confirmNoChanges = window.confirm(
      "Once uploaded, cannot be changed. Proceed?"
    );

    if (confirmAdminWallet && confirmUniqueName && confirmNoChanges) {
      setShowLoader(true);

      if (!fileUpload) return;

      try {
        setSubmitting(true);
        console.log("FIles", fileUpload);
        const formData = new FormData();
        formData.append("employeeName", employeeName);

        formData.append("PerformanceCertificates", fileUpload);
        console.log("Formdata", formData.entries());
        const response = await axios.post(`/uploadCertificate`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            req: "Access-Control-Allow-Origin",
          },
          withCredentials: true,
        });

        console.log(
          "Performance certificate uploaded successfully!",
          response.data.FileHash
        );
        console.log(response.data.FileHash);
        //     console.log(taskkk)

        const filehash = response.data.FileHash;
        const rewardAmount = tokens;
        console.log(rewardAmount);

        const date = new Date().toLocaleDateString("en-GB"); // Get the deadline in the dd/mm/yy format

        const responsee = await axios.post(
          `/awardemp/${employeeName}/${compName}/${employeeAddress}`,
          { awardname: awardName, tokens, awarddate: date },
          { withCredentials: true }
        );

        console.log(responsee.data);
        console.log(employeeName);
        console.log(compName);
        let resp = await executeTransaction(
          erc,
          provider,
          "registerFileAndSendReward",
          [filehash, employeeName, rewardAmount, employeeAddress]
        );
        log("Registered", "hash", resp.txHash);
        setShowLoader(false);
        setHash(resp.txHash);
        Swal.fire({
          icon: "success",
          title: "Awarded successfully!",
          text: `${employeeName} has been awarded`,
          confirmButtonColor: "#9A1B56",
          timer: 1500, // automatically close after 3 seconds
          showConfirmButton: true, // force the "ok" button to be visible
        });

        history.push("/real");
      } catch (error) {
        setShowLoader(false);
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Awarding Failed!",
            text: "Check if your wallet is connected & your balance",
            showConfirmButton: false, // force the "ok" button to be visible
          });
          setTimeout(function () {
            window.location.reload();
          }, 20000);
        }
        // history.push("/real");
      }

      // setSubmitting(false);
    }
  };

  const [award, setAward] = useState([]);
  const [awardName, setAwardName] = useState("");
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    axios
      .get(`/award`, { withCredentials: true })
      .then((response) => {
        setAward(response.data.award);
        console.log(response.data.award);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setAwardName(selectedOption);

    console.log(selectedOption);
    const selectedAward = award.find(
      (award) => award.AwardName === selectedOption
    );
    console.log(selectedAward);
    if (selectedAward) {
      const pp = selectedAward.tokens;
      setTokens(selectedAward.tokens);
      console.log(pp);
    } else {
      setTokens("");
    }
  };
  return (
    <div className="modal-container" style={{ backgroundColor: "fff" }}>
      <header
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem 0",
          height: "100px",
        }}
      >
        <div
          style={{
            position: "relative",
            bottom: "20px",
            left: "20px",
            marginLeft: "-1300px",
            top:"-16px"
          }}
        >
          <SidebarMenu />{" "}
        </div>
        <h2
          className="heading"
          style={{
            fontFamily: "Secular One",
            fontSize: "2.5rem",
            marginBottom: "1.5rem",
            color: "#333333",
            textAlign: "center",
            textTransform: "uppercase",
            position: "relative",
            bottom: "60px",
            color: "black",
            position:"relative",
            left:"-500px"
          }}
        >
          AWARDS{" "}
        </h2>
        <button
  style={{
    position: "relative",
    left: "500px",
    height: "60px",
    top: "-150px",
    borderRadius: "20px",
    background: connectClicked ? "blue" : "",
    cursor: connectClicked ? "not-allowed" : "pointer"
  }}
  onClick={connect}
  disabled={connectClicked}
>
  {connectClicked ? "Connected" : "Connect"}
</button>      </header>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          className="awardd"
          src={awarddd}
          style={{
            marginLeft: "50px",
            marginTop: "100px",
            width: "550px",
            height: "400px",
          }}
        />

        <form
          style={{
            backgroundColor: "transparent",
            width: "600px",
            marginTop: "100px",
            marginLeft: "100px",
            borderRadius: "10px",
            fontFamily: "Secular One",
            height: "350px",
          }}
        >
          <label
            className="modlabel"
            htmlFor="text"
            style={{
              color: "black",
              marginLeft: "220px",
              color: "black",
              fontWeight: "2000",
              fontSize: "30px",
            }}
          >
            <b style={{ color: "black", fontFamily: "Secular One" }}>
              {employeeName.toUpperCase()}
            </b>
          </label>
          <label
            className="modlabel"
            htmlFor="text"
            style={{ marginLeft: "220px", color: "#000" }}
          >
            Select Awards
          </label>
          <>
            <select
              className="inputfield"
              value={awardName}
              onChange={handleSelectChange}
              style={{
                backgroundColor: "#eee",
                borderRadius: "10px",
                padding: "1rem",
                border: "none",
                marginBottom: "1rem",
                width: "100%",
                fontWeight: "bolder",
              }}
            >
              <option
                value=""
                style={{ textDecoration: "line-through", color: "black" }}
              >
                Select Award
              </option>
              {award.map((awardObj) => (
                <option key={awardObj._id} value={awardObj.AwardName}>
                  {awardObj.AwardName}
                </option>
              ))}
            </select>

            <p
              style={{
                fontFamily: "Secular One",
                backgroundColor: "#EEEEEE",
                marginTop: "10px",
                borderRadius: "10px",
                marginLeft: "400px",
                padding: "6px",
                width: "150px",
                height: "40px",
              }}
            >
              Tokens : {tokens}{" "}
            </p>
          </>

          <div
            style={{
              position: "relative",
              top: "10px",
              marginTop: "-60px",
              marginLeft: "-400px",
            }}
          >
            <input
              style={{
                opacity: submitting ? 0.5 : 1,
                marginRight: "-80px",
                marginTop: "-800px",
                color: "white",
              }}
              disabled={submitting}
              type="file"
              accept=".pdf"
              onChange={(e) => setFileUpload(e.target.files[0])}
            />
          </div>

          <Link>
  <button
    id={connectClicked ? "singlebutton" : ""}
    name="singlebutton"
    className={connectClicked ? "btM" : ""}
    onClick={uploadFile}
    style={{
      fontFamily: "Secular One",
      position: "relative",
      borderRadius:"20px",
      top: "40px",
      width: "120px",
      backgroundColor: connectClicked ? "" : "grey",
      cursor: connectClicked ? "pointer" : "not-allowed",
    }}
    disabled={!connectClicked}
  >
    Award
  </button>
</Link>



        </form>
        {showLoader && (
          <div
            style={{
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
            }}
          >
            <Loader />
          </div>
        )}
        {/* </div> */}

        {/* <div style={{ marginTop: "0px", marginLeft: "-800px",marginTop:"100px", fontFamily: "Secular One", fontSize: "30px" }}>
  <ul >
    <li style={{fontFamily:"Secular One"}}>Select an award for your employee</li>
    <li style={{fontFamily:"Secular One"}}>Reward them with the chosen award</li>
    <li style={{fontFamily:"Secular One"}}>Watch your employees feel appreciated <br/> and  motivated!</li>
  </ul>
</div> */}
      </div>
    </div>
  );
};

export default Award;
