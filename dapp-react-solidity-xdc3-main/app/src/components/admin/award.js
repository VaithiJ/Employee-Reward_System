
import React, { useState, useEffect, useContext } from "react";
import "./CreateModal.css";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import { useHistory } from "react-router-dom";
import bg from "./ss.svg"
import "./real.css"

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");


const Award = (props) => {
  const { provider, erc } = useContext(EthereumContext);

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const tokenn = jwt_decode(cookies.access_token);
  const history = useHistory();

  const API_URL = "http://65.2.3.121:8800";

  const employeeName = props.match.params.Name;
  const employeeAddress = props.match.params.Wallet.replace("xdc","0x");
     console.log(employeeAddress)
  const compName = tokenn.name;
  const [task, setTask] = useState(" ");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  // const [comName, setComName] = useState(" ");
  // const [empId, setEmpId] = useState(" ");
  
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = async () => {
    
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
const confirmUniqueName = window.confirm("Does the certificate have a unique name?");
const confirmNoChanges = window.confirm("Once uploaded, cannot be changed. Proceed?");
// const employeeAddress = props.params.Wallet.replace("xdc","0x")
// console.log(employeeAddress)
// console.log(employeeName)

if (confirmAdminWallet && confirmUniqueName && confirmNoChanges ) {

//   axios
//       .put(
//         `${API_URL}/updateetask/${taskkk._id}`,
//         { certificates: "Certified" },
//         { withCredentials: true }
//       )
//       .then(async (responsee) => {
//         const updateFile = responsee.data.updatedTask;
//         console.log(responsee.data.updateFile);
//         setSubmitting(true);
        
// })

  if (!fileUpload) return;

  try {
    setSubmitting(true);
console.log("FIles",fileUpload)
    const formData =  new FormData();
     formData.append('PerformanceCertificates', fileUpload);
console.log("Formdata", formData.entries())
    const response = await axios.post(`${API_URL}/uploadCertificate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "req":"Access-Control-Allow-Origin"
      }, withCredentials:true
    });

    console.log('Performance certificate uploaded successfully!', response.data.FileHash);
    console.log(response.data.FileHash)
//     console.log(taskkk)

const filehash =response.data.FileHash;
const rewardAmount = 100;
// // console.log(hash,"ssssss")
let taskId = "13b3s"
// //  console.log(hash,"hashhhhhhh")
// console.log("asbdasbassdssmnadmasbdnabsmdasdsadsadsa", filehash)
// console.log(filehash,"filehash")
// console.log(taskId,"taskid")
let resp = await executeTransaction(erc, provider, "registerFileAndSendReward", [
  filehash,
  employeeName,
  rewardAmount,
  employeeAddress
]);
log("Registered", "hash", resp.txHash);
   } catch (error) {
    console.error('Error uploading file!', error);
    setSubmitting(false);
  }
    // let response = await queryData(erc, provider, "getFileHash", [taskId]);
    //     log("Returned hash", "hash", response);
        // const fileListRef = ref(storage, "certificates");
        // listAll(fileListRef)
        //   .then((res) => {
        //     res.items.forEach((itemRef) => {
        //       if (itemRef.name.slice(-64) === response) {
        //         console.log(itemRef.fullPath);
        //         getDownloadURL(itemRef)
        //           .then((url) => {
        //             console.log(url);
        //             window.open(url, "_blank");
        //           })
        //           .catch((error) => {
        //             console.log(error);
        //           });
        //       }
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
  
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
  
        setSubmitting(false);
      // })
      // .catch((error) => {
      //   console.log(error);
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      // });
  };
} 

  const handleAddModel = async (event) => {
  event.preventDefault();
}
  
const handleTasks = (e) => {
  setTask(e.target.value);

  // setProductId(product.productName);
};
//   try {
//     const deadlineDate = new Date(deadline); // Convert the deadline value to a Date object
//     const formattedDeadline = deadlineDate.toLocaleDateString("en-GB"); // Get the deadline in the dd/mm/yy format

//     const response = await axios.post(
//       `${API_URL}/assigntask/${employeeName}/${compName}/${empAddress}`,
//       { task, taskName, taskDescription, deadline: formattedDeadline, rewards },
//       { withCredentials: true }
//     );

//     console.log(response.data);
//     console.log(employeeName);
//     console.log(compName);

//     history.push("/real");
//   } catch (error) {
//     console.log("wrongyyyy");
//     console.error(error);
//   }
// };
const [award, setAward] = useState([]);
const [awardName, setAwardName] = useState("");
const [tokens, setTokens] = useState("");
  

useEffect(() => {
  axios
    .get(`${API_URL}/award`, { withCredentials: true })
    .then((response) => {
      setAward(response.data.award);
      console.log(response.data.award.AwardName)
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

console.log(award)
const handleSelectChange = (event) => {
  const selectedOption = event.target.value;
  setAwardName(selectedOption);

  const selectedAward = award.find((award) => award.name === selectedOption);
  if (selectedAward) {
    const pp = selectedAward.tokens
    setTokens(selectedAward.tokens);
    console.log("evlo tokens paa",pp )
  } else {
    setTokens("");
  }
};
console.log("irukiyaa mamaae", award)
console.log("superr", tokens)

  return (
    <div className="modal-container"  >
      <header style={{ backgroundColor: 'transparent', padding: '1.5rem 0',height:"100px" }}>
      <div style={{position:"relative",bottom:"20px",left:"20px", marginLeft:"-1200px"}}>
      <SidebarMenu /> </div>
  <h2
    className="heading"
    style={{ 
      fontFamily: 'Secular One', 
      fontSize: '2.5rem', 
      marginBottom: '1.5rem',
      color: '#333333',
      textAlign: 'center',
      textTransform: 'uppercase',
      position:"relative",
      bottom:"60px"

    }}>
    {employeeName}
  </h2>
</header>
<div
    className="Add-list"
    style={{
      backgroundColor: 'transparent',
     fontFamily:"Secular One",
      
      width: '1000px',
      textAlign: 'center',
      boxShadow: '0 24px 500px #26214a1a',
      borderRadius: '12px',
      padding: '2rem',
      marginLeft:"250px",
      height:"400px"
    }}
  >
         <form className="modal-form" style={{backgroundColor:"transparent", borderRadius:"40px", fontFamily:"Secular One",height:"300px"}} >
          <label className="modlabel" htmlFor="text" >
            Select Awards
          </label>
          <>
          <select className="inputfield" value={awardName} onChange={handleSelectChange} style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%',
              fontWeight:"bolder"
            }}>
              
  <option value="" style={{textDecoration:"line-through", color:"grey"}}>Select Award</option>
  {award.map((awardObj) => (
    <option key={awardObj._id} value={awardObj.AwardName}>{awardObj.AwardName}</option>
  ))}
</select>
<p>Total token rewards : {tokens} </p>

          </>
          {/* <label className="modlabel" htmlFor="text">
            Task Name
          </label>
          <input
            className="inputfield"
            id="model_id"
            name="task name"
            placeholder="Name"
            type="text"
            onChange={handleTaskName}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <label className="modlabel" htmlFor="text">
            Task Description
          </label>
          <textarea
            className="inputfield"
            id="description_name"
            name="description_name"
            placeholder="Description"
            type="text"
            onChange={handleTaskDescription}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <label className="modlabel" htmlFor="text">
            Deadline
          </label>
          <input
            className="inputfield"
            id="deadline"
            name="deadline"
            type="date"
            // value={deadline}
            onChange={handleDeadline}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <br /> */}
          {/* <label className="modlabel" htmlFor="text">
            Rewards
          </label>
          <>
          <select className="inputfield" value={rewards} onChange={handleRewards} style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}>
              <option value="">Select Rewards</option>
              <option value="10"> 10 </option>
              <option value="20"> 20 </option>
              <option value="30"> 30  </option>
             
            </select> */}
          {/* </> */}
          <div style={{position:"relative", top:"10px"}}>
                <input
                  style={{ opacity: submitting ? 0.5 : 1, marginRight:"-80px" }}
                  disabled={submitting}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <button
                  style={{ 
                    marginRight: '-90px', 
                    padding: '8px 16px', 
                    background: submitting ?'red' : "green", 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    opacity: submitting ? 0.5 : 1,
                    fontFamily:"Secular One",
                    marginLeft:"30px",
                    position:"relative",
                    left:"30px"
                  }}>
                  Upload
                </button> 
              </div>
            
              {/* onClick={() => uploadFile(task)} */}

          <Link to={"/real"}>
          <button

            id="singlebutton"
            name="singlebutton"
            className="btM"
            onClick={handleAddModel}
            style={{fontFamily:"Secular One",position:"relative",top:"40px"}}
          >
            Award Employee
          </button>
          </Link>
          {/* <br /> */}
        </form>
     </div>
      {/* <br /> */}
      {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warrenty
      </div>
      <br /> */}
    </div>
  
  );
};

export default Award;
