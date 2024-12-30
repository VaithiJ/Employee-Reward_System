import React, { useState, useEffect, useContext } from "react";
import "./task.css";
import axios from "../url.js"
import jwt_decode from "jwt-decode";
import { FaSignOutAlt , FaSquare} from "react-icons/fa";
import Loader from "../pages/Loader.js";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import crypto from "crypto";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip,ComposedChart   } from 'recharts';
import bg from "./grid3.png"
import ss from "./ss.svg"
import { BigNumber } from "ethers";
import "./reg.css"
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
import Swal from "sweetalert2";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref as dbRef, set } from "firebase/database";
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

const RewardTasks = (props) => {
  const [connecting, setconnecting] = useState(false);

   
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);
  const[connectClicked, setConnectClicked] = useState(false);

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
  const [tasks, setTasks] = useState([]);
  const { provider, erc } = ethereumContext;

  const [rewardedemp, setrewardedemp] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const [showLoader, setShowLoader] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [same, setSame] = useState(false);
  const sameAdd = () => {
    // console.log(tokenn.wallet.replace("xdc", "0x"));
    const ls = localStorage.getItem("WalletAddress");
    const sl = ls.toLowerCase();

    if (tokenn.wallet.replace("xdc","0x") == ls) {
      setSame(true);
    }
  }
  const fileListRef = ref(storage,'certificates');
  function generateHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
  window.onload = function() {
    alert("\n• Connect the wallet address of Admin and check it before using\n• Make sure you have unique name for each certificate which is to be uploaded\n• Once uploaded file to blockchain, cannot reupload another certiicate, so be careful\n• Make sure you have enough balance of tokens before rewarding ");
  }
  

  const uploadFile = async (taskkk) => {
    sameAdd()
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
const confirmUniqueName = window.confirm("Does the certificate have a unique name?");
const confirmNoChanges = window.confirm("Once uploaded, cannot be changed. Proceed?");
if (same==true && confirmAdminWallet && confirmUniqueName && confirmNoChanges ) {
  setShowLoader(true)

      let updatedTask = await axios.put(
      `/updatetask/${taskkk._id}`,
      { status: "Rewarded" },
      { withCredentials: true }
    ).then(response => response.data.updatedTask);
  
    console.log(updatedTask);



  if (!fileUpload) return;

  try {
    setSubmitting(true);
console.log("FIles",fileUpload)
    const formData =  new FormData();
    formData.append('employeeName', taskkk.empName); 

     formData.append('certificates', fileUpload);
console.log("Formdata", formData.entries())
    const response = await axios.post(`/uploadingCertificate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "req":"Access-Control-Allow-Origin"
      }, withCredentials:true
    });

    console.log('File uploaded successfully!', response.data.FileHash);
    console.log(response.data.FileHash)
    console.log(taskkk)

const filehash =response.data.FileHash;
// console.log(hash,"ssssss")
let taskId = taskkk._id.slice(-5);
//  console.log(hash,"hashhhhhhh")
console.log("asbdasbassdssmnadmasbdnabsmdasdsadsadsa", filehash)
console.log(filehash,"filehash")
console.log(taskId,"taskid")
// let resp = await executeTransaction(erc, provider, "registerFile", [
//   filehash,
//   taskId
// ]);
// log("Registered", "hash", resp.txHash);
//   } catch (error) {
//     console.error('Error uploading file!', error);
//     setSubmitting(false);
//   }
  let resp = await executeTransaction(erc, provider, "registerCertificateAndSendReward", [
    filehash,
    taskId, taskkk.empWalletAddress.replace("xdc", "0x"),
    taskkk.rewards
  ]);
  log("Registered", "hash", resp.txHash);
  axios
  .put(
    `/updateetask/${taskkk._id}`,
    { certificates: "Certified" },
    { withCredentials: true }
  )
  .then(async (responsee) => {
    const updateFile = responsee.data.updatedTask;
    console.log(responsee.data.updateFile);
    setSubmitting(true);
    
})
  setShowLoader(false)
  Swal.fire({

    icon: 'success',
   
   title: 'Rewarded successfully!',
   
    text: '',
   
    confirmButtonColor:"#9A1B56"
   
    })
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    } catch (error) {
      setShowLoader(false)
      axios
      .put(
        `/updateetask/${taskkk._id}`,
        { certificates: "false" },
        { withCredentials: true }
      )
      .then(async (responsee) => {
        const updateFile = responsee.data.updatedTask;
        console.log(responsee.data.updateFile);
        setSubmitting(true);
        
})
       
      Swal.fire({

        icon: 'error',
       
       title: 'Rewarding failed!',
       
        text: 'Check if you have a unique file name',
       
        confirmButtonColor:"#9A1B56"
       
        })
        setTimeout(() => {
          window.location.reload();
        }, 2500);      console.error('Error uploading file!', error);
      setSubmitting(false);
    }
        let response = await queryData(erc, provider, "getFileHash", [taskId]);
        log("Returned hash", "hash", response);
     
        setTimeout(() => {
          window.location.reload();
        }, 3000);
  
        setSubmitting(false);
  
  }else{
    alert(`This is not ${tokenn.name}'s address`)
  }
} 
useEffect(() => {
  const intervalId = setInterval(() => {
    sameAdd();
  }, 1000);
  return () => clearInterval(intervalId);
}, []);

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, { name: item.name, url: url }]);
        });
      });
    });
  }, []);
  const [submitting, setSubmitting] = useState(false);
  console.log("sample", erc);



  const tokenn = jwt_decode(cookies.access_token);

  // const empName = props.match.params.empName;
  // const taskk = props.match.params.task;
  // console.log(empName);

  
  const compName = tokenn.name;
  
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    axios
      .get(`/gettasks`, { withCredentials: true })
      .then((response) => {
        const re=  response.data.tasks.filter((tasks) => tasks.status === "Approved" || tasks.status === "Rewarded")
       setTasks(re.filter((task) => task.companyName===tokenn.name ))
        setrewardedemp(
          response.data.tasks.filter((tasks) => tasks.status === "Rewarded")
        );
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let account = tokenn.wallet.replace("xdc", "0x");
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()} tokens`);

    setSubmitting(false);
  };
  const data = [
    { name: 'Approved Employees', value: tasks.length },
    { name: 'Rewarded Employees', value: rewardedemp.length },
  
  ];
  const COLORS = ['red', '#F3DA06'];
  return (
    <div style={{backgroundColor:"#F9F8F8", height:"800px"}}>
    <div className="containerr" >
      <div className="main"  >
        <header style={{backgroundColor:"#F9F8F8", marginTop:"-20px"}}>
        <h1 className="headerrr" style={{fontFamily:"Secular One", fontSize:"40px", marginTop:"30px", marginLeft:"-950px"}}>REWARD </h1>
        <div style={{ position: "relative", right: "550px", bottom: "70px" , marginLeft:"-120px", marginTop:"-0px"}}>
          {" "}
          <SidebarMenu/>{" "}
          <button
                  onClick={balanceOf}
                  className="btn btn-primary"
                  style={{
                    margin: "1rem",
                    marginLeft: "1950px",
                    marginTop: "-20px",
                    borderRadius: "10px",
                    height: "45px",
                    backgroundColor: "#1196B0",
                    width: "110px",
                    fontFamily:"Secular One",
                 }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#330078";
                    // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                    e.target.style.boxShadow = " 1px 0px 19px 5px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1196B0";
                    e.target.style.border = "none";
                    e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0,1.0)";
                  }}
                >
                  <FaSignOutAlt /> Balance
                </button>
                <button
  style={{
    position: "relative",
    left: "1200px",
    height: "60px",
    top: "-60px",
    borderRadius: "20px",
    backgroundColor:"#1196B0",
    background: connectClicked ? "red" : "",
    cursor: connectClicked ? "not-allowed" : "pointer"
  }}
  onClick={connect}
  disabled={connectClicked}
>
  {connectClicked ? "Connected" : "Connect"}
</button></div>
</header>

<div className="container" style={{ 
  
  background: "white", 
  padding: '0px 20px', 
  borderRadius: '0px', 
  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.3) inset",
  border: '1px solid #ccc',
  marginBottom: '20px',
  marginLeft:"700px",
  marginTop:"300px",
  width:"1400px"}}>
  <h2 className="containerrr" style={{fontFamily:"Secular One",marginTop:"20px"}}>TASKS</h2>
  <div className="task-list-container" style={{ height: '500px', overflowY: 'auto',marginTop:"-100px",  }}>
    <div className="task-list" style={{ width: "1100px" ,fontFamily:"Secular One",}}>
      <div className="task-list" style={{fontFamily:"Secular One"}}>
        <div className="task-list-header" style={{fontFamily:"Secular One",backgroundColor:"#D1D1D1"}}>
          <div className="task-name" style={{fontFamily:"Secular One", marginLeft:"-60px" }}>UID</div>
          <div className="task-name" style={{ fontFamily:"Secular One",marginLeft:"-70px" }}>TASK NAME</div>
          <div className="task-namee" style={{fontFamily:"Secular One",}}>NAME</div>
          <div className="task-wallet" style={{fontFamily:"Secular One",width:"-20"}}>WALLET ADDRESS</div>
          {/* <div className="task-assigned-to" style={{ width: '20%' }}>Assigned To</div> */}
          <div className="task-due-date" style={{fontFamily:"Secular One",}}>DUE DATE</div>
          <div className="task-due-date" style={{fontFamily:"Secular One",marginRight:"70px"}}>TOKENS</div>
          <div className="task-progress" style={{fontFamily:"Secular One",}}>UPLOAD & REWARD</div>
          {/* <div className="task-status" style={{ width: '15%', paddingLeft: "30px",fontFamily:"Secular One", }}>REWARDS</div> */}
        </div>
        {tasks.map((task) => (
          <div
            className="task-list-item"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginTop: '10px', 
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
              backgroundColor:"white"
            }}
          >
            <div className="task-nameee" style={{fontFamily:"Secular One",}}>{(task._id).slice(-5)}</div>
            <div className="task-name" style={{fontFamily:"Secular One",}}>{task.task}</div>
            <div className="task-assigned-too" style={{fontFamily:"Secular One",}}>{task.empName}</div>
            <div className="task-assigned-to" style={{fontFamily:"Secular One",}}>xdc...{task.empWalletAddress.slice(-5)}</div>
            <div className="task-due-date" style={{fontFamily:"Secular One",}}>{task.deadline}</div>
            <div className="task-progress" style={{fontFamily:"Secular One",marginRight:"80px"}}>{task.rewards}</div>
            {task.certificates==="false" ? (
             <div>
             <input
               style={{ opacity: submitting || !connectClicked ? 0.5 : 1, marginRight: "-80px" }}
               disabled={submitting || !connectClicked}
               type="file"
               accept=".pdf"
               onChange={(e) => setFileUpload(e.target.files[0])}
               name="certificates"
             />
             <button
               style={{
                 marginRight: "-90px",
                 padding: "8px 16px",
                 background: submitting || !connectClicked ? "grey" : "green",
                 color: "white",
                 border: "none",
                 borderRadius: "4px",
                 cursor: submitting || !connectClicked ? "not-allowed" : "pointer",
                 opacity: submitting || !connectClicked ? 0.5 : 1,
                 fontFamily: "Secular One",
                 marginLeft: "30px"
               }}
               onClick={() => uploadFile(task)}
             >
               Upload Certificates
             </button>
           </div>
           
            ) : (
              <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily:"Secular One",marginRight:"60px" }}>Uploaded</div>
            )}
           
                </div>
                ))}
                </div>
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

      </div>
    </div>
    </div>
  );
};

export default RewardTasks;
