
import React, { useState, useEffect, useContext } from "react";
import { FaBell, FaUser, FaTimes, FaHome,FaSquare } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import styles from "../admin/dash.module.css";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "../url.js"
import "../admin/real.css";
import Footercr from "../footer/footercr.js"
import { erc as address } from '../../output.json';
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip,ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,BarChart
   } from 'recharts';
import SidebarMenu12 from "./side1";
import { Link } from "react-router-dom";
const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");
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

const Card = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.style.backgroundColor,
        color: "white",
        padding: "40px",
        fontSize: "20px",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 5.0)",
        margin: "20px",
        width: "500px",
      }}
    >
      <FontAwesomeIcon
        icon={faFileText}
        size="4x"
        style={{ marginBottom: "20px", marginLeft: "20px", opacity: "0.75" }}
      />
      <div>
        <h3 style={{ marginBottom: "10px", fontSize: "60px" }}>
          {props.count}
        </h3>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

const EmployeeDashboard = (props) => {

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
    setConnectClicked(true)

  }
  const { provider, erc } = ethereumContext;

  const [balanceToken, setBalanceToken] = useState();
  const [open, setOpen] = useState(false);
  const togglePopup = (task) => {
    setSelectedTasks(task);
    setOpen(true);
  };
  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let account = toke.wallet.replace("xdc", "0x");
    console.log(account);

    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()}`);

    setSubmitting(false);
  };

  const MarkasCompleted = (taskk) => {
    const confirmed = window.confirm(
      "Clicking on mark as completed notifies the admin. Are you sure you want to continue?"
    );
    if (confirmed) {
      const date = new Date().toLocaleDateString("en-GB"); // get current date in dd/mm/yy format
      axios
        .put(
          `/updatetask/${taskk._id}`,
          { status: "Waiting For Approval" },
          { withCredentials: true }
        )
        .then(() => {
          axios
            .put(
              `/completion/${taskk._id}`,
              { completion: date },
              { withCredentials: true }
            )
            .then((response) => {
              window.location.reload();
              const updatedTask = response.data.updatedTask;
              console.log(response.data.updatedTask);
              // update tasks state
              setTasks(
                tasks.map((t) => {
                  if (t._id === updatedTask._id) {
                    window.location.reload();
                    return updatedTask;
                  } else {
                    window.location.reload();
                    return t;
                  }
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [compemployees, setcompemployees] = useState([]);
  const[connectClicked, setConnectClicked] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const Approved = tasks.filter((task) => task.status === "Approved").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const Rewarded = tasks.filter((task) => task.status === "Rewarded").length;
  const waitingforapproval = tasks.filter((task) => task.status === "Waiting For Approval").length;
  const Alltasks = tasks.length;
console.log("rowwwww",Alltasks)
  const toke = jwt_decode(cookies.employee_token);
  // console.log(toke)
  useEffect(() => {
    axios
      .get(`/viewtask`, { withCredentials: true })
      .then((response) => {
        setTasks(
          response.data.tasks.filter((tasks) => tasks.empName == toke.name)
        );
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/empdetails`, { withCredentials: true })
      .then((response) => {
        const userData = response.data.user.filter(
          (user) => user.name === toke.name
        );
        setEmployees(userData);
        console.log("mm", userData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/comemps`, { withCredentials: true })
      .then((response) => {
        const empdata = response.data.details.filter(
          (details) => details.Name === toke.name
        );
        setcompemployees(empdata);
        console.log("compemployees", empdata);
      })
      .catch((error) => {
        console.log(error);
      });

    // here is the online profile update
    axios
      .put(
        `/condition/${toke.name}`,
        { condition: "online" },
        { withCredentials: true }
      )
      .then((response) => {
        const condition = response.data.UpdatedCondition;
        console.log(response.data.UpdatedCondition);
      });
  }, []);

  console.log("name stored in token", toke.name);

  const [submitting, setSubmitting] = useState(false);
  console.log("sample", erc);

  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(!showBox);
  };
  const handleClose = () => {
    setShowBox(false);
  };
  console.log(tasks);
  const status = tasks.status;
  const onboarded = employees && employees[0] && employees[0].isOnboarded;

  console.log("vanakam", onboarded);

  const data = [
    { name: 'pending',value:pendingTasks },
    {name: 'Waiting for Approval', value:waitingforapproval},
    { name: 'Approved Tasks', value: Approved },
    { name: 'Rewarded Tasks', value: Rewarded },
    { name: 'Total Tasks', value: Alltasks},
  ];
  const COLORS = ['red','#FFD700', '#32CD32', '#4F200D', '#27E1C1'];
  const getTextColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ED2B2A";
      case "Waiting For Approval":
        return "#F99417";
      case "Approved":
        return "#16FF00";
      case "Rewarded":
        return "#865DFF";
      default:
        return "black"; // Default color if status is not recognized
    }
  };

  return (
    <div>
      <header
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          height:"100px",
          backgroundColor:"white"
        }}
      >
        
        <div style={{ position: "relative", bottom: "33px" }}>
          <SidebarMenu12
            style={{ color: "#fff", backgroundColor: "#009FBD" }}
          />{" "}
          {/* Updated color */}
        </div>
      
        <button
          onClick={balanceOf}
          className="btn btn-primary"
          style={{
            margin: "1rem",
            marginLeft: "650px",
            marginTop: "30px",
            borderRadius: "10px",
            height: "45px",
            backgroundColor: "#1196B0",
            width: "110px",
            position:"relative",
            left:"250px",
            bottom:"30px",
            fontFamily: "secular one"

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
          {/* <MdAccountBalanceWallet style={{position:"relative", right:"15px",height:"30px",width:"30px"}}/> */}
          Balance
        </button>
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
</button>        {/* <div>
            <FaBell
              onClick={handleClick}
              style={{
                color: "white",
                position: "relative",
                zIndex: 1,
                height: "35px",
                width: "35px",
                top: "17px",
                color:"black",
              }}
            />
            {onboarded ? (
              <p
                style={{
                  color: "#FFFFFF",
                  position: "relative",
                  top: "-40px",
                  right: "-30px",
                  background: "#FF0000",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  textAlign: "center",
                }}
              ></p>
            ) : null}

            {showBox && (
              <div>
                {compemployees.map((comp) => (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                      padding: "16px",
                      position: "absolute",
                      top: "100px",
                      right: "0px",
                      zIndex: 2,
                    }}
                  >
                    <FaTimes
                      onClick={handleClose}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        cursor: "pointer",
                      }}
                    />
                    {onboarded ? (
                      <p
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "2px 2px 5px grey",
                          background: "#f2f2f2",
                          fontFamily: "Segoe UI"
                        }}
                      >
                        You have been Onboarded by {comp.comName}
                      </p>
                    ) : null}
                    {pendingTasks !== "0" ? (
                      <p
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "2px 2px 5px grey",
                          background: "#f2f2f2",
                          fontFamily: "Segoe UI"
                        }}
                      >
                        You have been assigned with {pendingTasks} tasks
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div> */}
        <h1
          style={{
            color: "white",
            fontFamily: "Segoe UI",
            textAlign: "center",
            position: "relative",
            right: "900px",
            top: "-5px",
            fontWeight: "bolder",
            color:"black",
          }}
        >
        DASHBOARD
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", left: "170px" }}></div>
         
        </div>
      </header>

      <main
  style={{
    display: "flex",
    justifyContent: "center",
    padding: "30px",
    alignItems: "center",
    fontStyle: "kanit",
    flexWrap: "wrap", // Add this line
    width: "100%",
    backgroundColor:'#F9F8F8' // Add this line to occupy full width of the page
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      // marginLeft: "-600px",
      marginTop: "60px",
      width: "100%", // Add this line to occupy full width of the page
    }}
  >
    <div
      className="row"
      style={{ marginTop: "0px", marginLeft: "-330px", width: "100%" }} // Add this line to occupy full width of the page
    >
      <div className="col-md-4">
        <div
          className="card"
          style={{
            color: "white",
            height: "150px",
            marginBottom: "20px",
            boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
            border: "0px",
            backgroundColor: "white",
            flex: "1",
            width: "100%",
            position:'relative',
            left:"350px" // Add this line to occupy full width of the card
          }}
        >
          <div className={styles.txt} style={{ marginTop: "20px" }}>
            <h3>
              <b
                style={{
                  marginLeft: "90px",
                  marginBottom: "100px",
                  marginLeft: "",
                  fontSize: "70px",
                  color:"red"
                }}
              >
                {pendingTasks}
              </b>
            </h3>
            <FaHome
              style={{
                marginLeft: "200px",
                marginTop: "-120px",
                height: "70px",
                width: "80px",
                opacity: "0.5",
                color:"red"
              }}
            />
            <br />
            <div style={{ marginTop: "-20px", marginLeft: "10px", fontFamily: "Segoe UI",fontSize:"1.2rem",fontWeight:"bolder",color:"red"}}>
              Pending
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card"
          style={{
            color: "white",
            height: "150px",
            marginBottom: "20px",
            boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
            border: "0px",
            backgroundColor: "white",
            flex: "1",
            width: "100%",
            position:'relative',
            left:"350px" // Add this line to occupy full width of the card
          }}
        >
          <div className={styles.txt} style={{ marginTop: "20px" }}>
            <h3>
              <b
                style={{
                  marginLeft: "90px",
                  marginBottom: "100px",
                  marginLeft: "-0px",
                  fontSize: "70px",
                  color:"#32CD32"

                }}
              >
                {Approved}
              </b>
            </h3>
            <FaHome
              style={{
                marginLeft: "200px",
                marginTop: "-120px",
                height: "70px",
                width: "80px",
                opacity: "0.5",
                color:"#32CD32"
              }}
            />
            <br />
            <div style={{ marginTop: "-20px", marginLeft: "10px",fontFamily: "Segoe UI" ,fontSize:"1.2rem",fontWeight:"bolder",color:"#32CD32"}}>
              Approved
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card"
          
          style={{
            color: "white",
            height: "150px",
            marginBottom: "20px",
            boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
            border: "0px",
            backgroundColor: "white",
            flex: "1",
            width: "100%",
            position:'relative',
            left:"350px" // Add this line to occupy full width of the card
          }}
        >
          <div className={styles.txt} style={{ marginTop: "20px" }}>
            <h3>
              <b
                style={{
                  marginLeft: "90px",
                  marginBottom: "100px",
                  marginLeft: "",
                  fontSize: "70px",
                  color:'#27E1C1',
                  fontFamily:"Segoe UI"
                }}
              >
                {Alltasks}
              </b>
            </h3>
            <FaHome
              style={{
                marginLeft: "200px",
                marginTop: "-120px",
                height: "70px",
                width: "80px",
                opacity: "0.5",
                color:"#27E1C1"
              }}
            />
            <br />
            <div style={{ marginTop: "-20px", marginLeft: "10px",fontFamily: "Segoe UI",fontSize:"1.2rem",fontWeight:"bolder",color:"#27E1C1" }}>
              All Tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {onboarded ? (
  <div style={{ display: 'flex', alignItems: 'center' ,position:"relative",left:"750px",top:"100px",width:"350px"}}>
                <ul style={{marginTop:"-300px",fontSize:"24px", marginLeft:"-180px", fontFamily: "Segoe UI", fontWeight:"1000",position:"relative",right:"30px",bottom:"10px"}}>
                TASKS</ul>
  {/* <div style={{ marginRight: '-70px' }}>
    
    <p style={{marginLeft:"-10px", fontFamily:"Montserrat"}}>TOTAL : <FaSquare style={{backgroundColor:"#27E1C1 ", color:"#27E1C1 "}}/></p>
    <p style={{marginLeft:"-10px",fontFamily:"Montserrat"}}>PENDING : <FaSquare style={{color:"red", backgroundColor:"red"}}/></p>
    <p style={{marginLeft:"-10px",fontFamily:"Montserrat"}}>APPROVAL <FaSquare style={{color:"#FFD700", backgroundColor:"#FFD700"}}/></p>
    <p style={{marginLeft:"-10px",fontFamily:"Montserrat"}}>APPROVED : <FaSquare style={{backgroundColor:"#32CD32", color:"#32CD32"}}/></p>

    <p style={{marginLeft:"-10px",fontFamily:"Montserrat"}}>REWARDED :<FaSquare style={{backgroundColor:"#4F200D", color:"#4F200D"}}/></p>


  </div> */}
 
  <PieChart style={{width:"430px",boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",marginLeft:"-260px"}} width={800} height={400} >
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          style={{color:"black"}}
        >   
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        
        </Pie> 
        <Tooltip/>
      </PieChart>
      </div>
  ): null }
</main>


    
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <div
          style={{
            padding: "2px",
            position: "relative",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            height:"600px",
            border:"10px solid #789BF1"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => setOpen(false)}
              style={{
                fontSize: "30px",
                color: "red",
                cursor: "pointer",
                fontWeight:"1000"
              }}
            >
              <FaTimes/>
            </span>
          </div>
          {selectedTasks && (
            <div style={{ padding: "20px", textAlign: "center" , backgroundColor:"#F9F8F8"}}>
              
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#333",
                  fontFamily:"Segoe UI",
                  marginTop:"50px"
                }}
              >
                {selectedTasks.task.toUpperCase()}
              </div>
              <div
                  style={{
                    fontSize: "16px",
                    marginRight: "165px",
                    fontWeight: "bolder",
                    color: "#777",

                  }}
                >
                  Task Name:
                </div>
                <div
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "#555",
                  fontFamily: "Segoe UI",
                  fontWeight: "bolder",
                  marginRight:"-10px",
                  marginTop:"-24px"
                }}
              >
                {selectedTasks.taskName}
              </div>
              <div
                  style={{
                    fontSize: "16px",
                    marginRight: "125px",
                    fontWeight: "bolder",
                    color: "#777",

                  }}
                >
                  Task Description:
                </div>
              <div
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "#555",
                  fontFamily: "Segoe UI",
                  fontWeight: "bolder",
                  marginTop:"5px",
                  marginLeft:"60px"
                }}
              >
                {selectedTasks.taskDescription}
              </div>
         
            
              <div
                  style={{
                    fontSize: "16px",
                    marginRight: "195px",
                    fontFamily:"Segoe UI",
                    fontWeight:"bolder",
                    color: "#777",

                  }}
                >
                  Status:
                </div>
              <div
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "#555",
                  fontFamily: "Segoe UI",
                  fontWeight: "bolder",
                  marginTop:"-24px"
                }}
              >
                {selectedTasks.status}
              </div>
              <div
                  style={{
                    fontSize: "16px",
                    marginRight: "180px",
                    fontWeight: "bolder",
                    color: "#777",

                    
                  }}
                >
                  Rewards:
                </div>
              <div
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "#555",
                  fontFamily: "Segoe UI",
                  fontWeight: "bolder",
                  marginTop:"-24px"

                }}
              >
                {selectedTasks.rewards}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "20px",
                  color: "#777",
                  marginLeft:"68px"
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Deadline:
                </div>
                <div style={{ fontSize: "16px", color: "red" }}>
                  {selectedTasks.deadline}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:"50px"
                }}
              >
                <button
                  style={{
                    marginTop:"200px",
                    background:
                      "linear-gradient(to left, #52c234 20%, #061700  0%, #52c234  0%)",
                    margin: "10px",
                    padding: "15px 45px",
                    textAlign: "center",
                    textTransform: "uppercase",
                    transition: "0.5s",
                    backgroundSize: "200% auto",
                    color: "white",
                    boxShadow: "0 0 20px #eee",
                    borderRadius: "10px",
                    display: "block",
                    cursor: "pointer",
                    width: "auto",
                    fontSize: "16px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    outline: "none",
                    fontFamily:"Segoe UI"
                  }}
                  onClick={() => MarkasCompleted(selectedTasks)}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#16FF00";
                    e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(to left, #52c234 20%, #061700  0%, #52c234  0%)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      {onboarded ? (
        <div
          className="card"
          style={{
            boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
              // backgroundColor: "#17A2B8",
              marginBottom: "40px",
              width: "800px",
              position:"relative",
              left:"60px",
              bottom:"330px",
              height:"400px"
          }}>
          <h5
             className="card-header font-weight-bold"
             style={{
               textAlign: "center",
               fontFamily: "Segoe UI",
               padding: "20px",
               // backgroundColor: "#17A2B8",
               color: "black",
               fontWeight: "1000",
               fontSize:"16px",
               height:"12px",
               position:"relative",
               bottom:"5px"
            }}
          >
            PENDING TASKS
          </h5>
          <div className={`${styles.cardBody}`}>
            <div
              className={`${styles.listGroup} list-group`}
              id="employee-list"
            >
              <div
                className="list-group"
                style={{ maxHeight: "1350px", overflowY: "auto" }}
              >
                {tasks.map((task) => (
                  <div
                    key={task.task}
                    className="list-group-item"
                    style={{
                      border: "0.1px dotted black",
                      
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ textAlign: "left" , fontSize:"10px"}}>
                        <h6
                          className="font-weight-bold mb-0"
                          style={{
                            fontFamily: "Segoe UI",
                            marginTop: "20px",  
                            fontSize:'10px !important' 
                          }}
                        >
                          <b style={{fontSize:"16px",fontFamily:"Segoe UI"}}> 
                            {task.task.toUpperCase()}{" "}
                            {/* Convert task.task to uppercase */}
                          </b>
                        </h6>

                        <small style={{fontFamily: "Segoe UI", fontSize:"13px"}}>Deadline: {task.deadline}</small>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "4px",
                          // boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.1) inset", // updated boxShadow with rgba for a more realistic effect
                          width: "auto",
                          height: "40px",
                          alignItems: "center",
                          textAlign: "center",
                          // background: "#FEFBE9",
                          position: "relative",
                          top: "10px",
                        }}
                      >
                        <p
                          style={{
                            marginRight: "10px",
                            fontFamily: "Segoe UI",
                            position: "relative",
                            top: "7px",
                            color: "#000000",
                            fontFamily: "Segoe UI",
                            fontSize:'16px' // updated text color
                          }}
                        >
                          Status:
                        </p>
                        <p
                          style={{
                            marginBottom: "0",
                            color: getTextColor(task.status),
                            textAlign: "center",
                            fontFamily: "Segoe UI",
                            fontWeight: "bold",
                            fontSize:"16px" // updated font weight for better readability // updated text transform to uppercase for a more stylish look
                          }}
                        >
                          {task.status}
                        </p>
                      </div>

                      {task.status === "Pending" ? (
                        <button
                        className="btn btn-primary"
                        style={{
                          fontFamily: "Algeria",
                          marginTop: "20px",
                          fontWeight: "1000",
                          color: "blue",
                          backgroundColor: "white",
                        }}
                        onClick={() => {
                          togglePopup(task);
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "blue";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white";
                          e.target.style.color = "blue";
                        }}
                      >
                        View Tasks
                      </button>


                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>You haven't joined the company yet!</h2>
        </div>
      )}
      {/* <footer> <Footercr/></footer> */}
    </div>
 
  );
};

export default EmployeeDashboard;