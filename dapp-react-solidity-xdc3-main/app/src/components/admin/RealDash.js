import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt, FaSquare } from "react-icons/fa";
import AdminButton from "./AdminButton.js";
import { AiFillStar } from "react-icons/ai";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import styles from "./dash.module.css";
import bg from "./lay.svg";
import "./real.css";
import { momentLocalizer } from "react-widgets";
import moment from "moment";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import NavBar from "../Headerr/AdminHeader.js"
import {
  FaBars,
  FaUserPlus,
  FaTasks,
  FaGift,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json";
import { erc as address } from "../../output.json";
// import {Calendar} from "react-calendar"
import SidebarMenu from "./side.js";
import { isSameDay } from "date-fns";
import del from "../Platform admin/tokkk.png";
const {
  executeTransaction,
  queryData,
  log,
  EthereumContext,
} = require("react-solidity-xdc3");

function RealDash(connect) {
  const [ethereumContext, setethereumContext] = useState({});

  const [search, setSearch] = useState('');
  const [search1, setSearch1] = useState("");
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Alltasks, setAllTasks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = ethereumContext;
  console.log("sample", erc);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  // const localizer = momentLocalizer(moment);
  const history = useHistory();
  // const [open, setOpen] = useState(false);
  const tokenn = jwt_decode(cookies.access_token);
  console.log(tokenn);
  // const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(true);
  };
  const [task, setTask] = useState([]);

  function isCurrentDate(date, currentDate) {
    return isSameDay(date, currentDate);
  }
  const [dateState, setDateState] = React.useState(new Date());
  const [markedDates, setMarkedDates] = React.useState([]);

  const changeDate = (date) => setDateState(date);

  const [showModal, setShowModal] = React.useState(false);
  // const [modalContent, setModalContent] = React.useState("");

  const [selectedTasks, setSelectedTasks] = React.useState(null);

  const handleClick = (tasks) => {
    setShowModal(true);
    setSelectedTasks(tasks);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const tasks = markedDates.filter(
        (task) => task.deadline === formattedDate && tokenn.name === task.companyName
      );
      if (tasks.length > 0) {
        return (
          <AiFillStar
            onClick={() => handleClick(tasks)}
            style={{
              position: "relative",
              height: "15px",
              width: "15px",
              bottom: "13px",
              color: "#FF6000",
            }}
          />
        );
      }
    }
  };
  // ction tileContent({ date, view }) {
  //   if (view === 'month' && markedDates.some(d => isSameDay(d, date))) {
  //     return (
  //       <div className="marker">
  //         <BsFillStarFill style={{color:"yellow",width:"12px",height:"12px"}}/>
  //       </div>
  //     );
  //   }
  // }

  // function isSameDay(a, b) {
  //   return a.getFullYear() === b.getFullYear() &&
  //     a.getMonth() === b.getMonth() &&
  //     a.getDate() === b.getDate();
  // }

  const regCompany = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    let companyname = tokenn.name;

    let resp = await executeTransaction(erc, provider, "regCompany", [
      companyaddress,
      companyname,
    ]);
    log("Registered company", "hash", resp.txHash);
    setSubmitting(false);
  };

  const mint = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // let to = tokenn.wallet.replace("xdc", "0x");
    let to = "0xced4b32fa8745f1de58a96555803d9724c637af8";
    let amount = "20";
    console.log(amount);

    let resp = await executeTransaction(erc, provider, "mint", [to, amount]);
    log("mint ", "hash", resp.txHash);
    setSubmitting(false);
  };
  const sendReward = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // let to = tokenn.wallet.replace("xdc", "0x");
    let employeeaddress = "0xced4b32fa8745f1de58a96555803d9724c637af8";
    let amount = "1";
    console.log(amount);

    let resp = await executeTransaction(erc, provider, "sendReward", [
      employeeaddress,
      amount,
    ]);
    log("reward ", "hash", resp.txHash);
    setSubmitting(false);
  };

  const getCompanyEmployees = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    // let companyaddress = "9fe6366315d0dfebd2fee73fdcc638806a1fc2c8";

    let respp = await queryData(erc, provider, "getCompanyEmployees", [
      companyaddress,
    ]);
    log("Registered company", "hash", respp);
    alert(respp);
    setSubmitting(false);
  };

  const isCompanyRegistered = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    let response1 = await queryData(erc, provider, "isCompanyRegistered", [
      companyaddress,
    ]);
    log("submitClaim", "hash", response1);
    setSubmitting(false);
  };



  useEffect(() => {
    const token = cookies.access_token;
    localStorage.setItem("WalletAddress", tokenn.wallet.replace("xdc", "0x"));

    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.isAdmin) {
        Swal.fire({
          icon: "error",

          title: "Account not verified!",

          text: "Your account will be verified soon",

          confirmButtonColor: "#9A1B56",
        });
        history.push("/logincomp");
      }
    } else {
      // Handle case where token is not present
    }

    axios
      .get(`/comemps`, { withCredentials: true })
      .then((response) => {
        setEmployees(response.data.details);
        console.log(response.data.details);
      })
      .catch((error) => {
        console.log(error);
      });
    // }, []);

    axios
      .get(`/gettasks`, { withCredentials: true })
      .then((response) => {
        setAllTasks(response.data.tasks);
        console.log("good", response.data.tasks);
        setMarkedDates(
          response.data.tasks.filter(
            (task) =>
              task.status === "Pending" ||
              task.status === "Waiting For Approval"
          )
        );
        // console.log("vantiyaa da ",specifictask)

        // console.log("vanthuraa maplaae",filteredDeadlines)
        setTasks(
          response.data.tasks.filter(
            (tasks) =>
              tasks.status === "Pending" ||
              tasks.status === "Waiting For Approval"
          )
        );

        console.log(response.data.tasks);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
  const currentDate = new Date();
  console.log(currentDate);
  const re = Alltasks.filter((task) => task.companyName === tokenn.name).length;
  console.log(re);
  if (cookies.access_token && jwt_decode(cookies.access_token).isAdmin) {
    const filteredEmployees = employees.filter((employee) => {
      console.log(employee.isOnboarded);

      return (
        employee.comName === tokenn.name &&
        employee.Onboard === false && // Check if employee's company name matches tokenn's company name
        (employee.Name.toLowerCase().includes(search.toLowerCase()) || // Check if employee's name includes the search term
          employee.comId.toString().includes(search)) // Check if employee's company name includes the search term
      );
    });

    const OnboardedEmployees = employees.filter((emp) => emp.comName === tokenn.name).length;
    const rewardedTasks = Alltasks.filter(
      (task) => task.status === "Rewarded" && task.compName === tokenn.name
    ).length;
    const PendingApprovals = tasks.filter(
      (task) =>
        task.status === "Waiting For Approval" &&
        task.companyName === tokenn.name
    ).length;
    const TaskIncentive = Alltasks.filter(
      (task) => task.status === "Approved" && task.companyName === tokenn.name
    ).length;
    const Assignedtasks = tasks.filter(
      (task) => task.status === "Pending" && task.companyName === tokenn.name
    ).length;
    const everytasks = tasks.filter(
      (task) =>
        task.status === "Pending" ||
        (task.status === "Approved" && task.companyName === tokenn.name)
    ).length;
    const data = [
      { name: "Waiting for approval", value: PendingApprovals },
      { name: "Assigned Tasks", value: Assignedtasks },
      { name: "Rewarded Tasks", value: rewardedTasks },
      { name: "Total Tasks", value: re },
    ];
    const COLORS = ["red", "#F3DA06", "black", "green"];

    const filteredTasks = tasks.filter((task) => {
      return (
        task.companyName === tokenn.name &&
        task.isPending === true &&
        // Check if employee's company name matches tokenn's company name
        (task.task.toLowerCase().includes(search1.toLowerCase()) || // Check if employee's name includes the search term
          task.empName.toString().includes(search1)) // Check if employee's company name includes the search term
      );
    });

    console.log("noice", filteredTasks);
    return (
      <div>
        <NavBar/>
        <div style={{ backgroundColor: "#F9F8F8" }}>
          <div className="row">
            {/* <div
          style={{
            borderRadius: "20px",
            boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
          }}
        > */}

            <div className="col-md-3"></div>
            <div className="col-md-9">
              <div
                className="hea"
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "-20px",
                  marginLeft: "-350px",
                  backgroundColor: "white",
                }}
              >
                {/* <div
                className={styles.span}
                style={{ marginLeft: "80px", backgroundColor: "#00F1C3" }}
              >
                <div
                  style={{
                    marginTop: "0px",
                    marginLeft: "-900px",
                    backgroundColor: "#00F1C3",
                  }}
                > */}
                {/* <div
                  className="sidee"
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  <SidebarMenu />
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "60px",
                    fontFamily: "Algeria",
                    fontSize: "30px",
                  }}
                >
                  <b
                    className="del"
                    style={{
                          fontFamily: "Roboto, sans-serif",
,
                      fontWeight: "1000",
                      fontSize: "40px",
                      marginLeft: "-40px",
                    }}
                  >
                    {tokenn.name.toUpperCase()}
                  </b>
                </div> */}
            
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "-600px",
                  marginTop: "60px",
                }}
              ></div>

              <div
                className="row"
                style={{ marginTop: "0px", marginLeft: "-340px" }}
              >
                <div className="col-md-4">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      border: "0px",
                      backgroundColor: "white",
                      width: "430px",
                    }}
                  >
                    <div className={styles.txt} style={{ marginTop: "20px" }}>
                      <h3>
                        <b
                          style={{
                            marginLeft: "90px",
                            marginTop: "680px",
                            fontSize: "70px",
                            marginLeft: "",
                                fontFamily: "Roboto, sans-serif",

                            color: "#1196B0",
                          }}
                        >
                          {OnboardedEmployees}
                        </b>
                      </h3>
                      <FaUser
                        style={{
                          marginLeft: "200px",
                          marginTop: "-120px",
                          height: "70px",
                          width: "80px",
                          opacity: "0.5",
                          color: "#1196B0",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          marginTop: "-20px",
                          color: "#1196B0",
                          marginLeft: "10px",
                          fontFamily: "Algeria",
                        }}
                      >
                        Total Onboarded Employees
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
                      border: "0px",
                      backgroundColor: "white",
                      width: "420px",
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
                                fontFamily: "Roboto, sans-serif",

                            color: "#F3DA06",
                          }}
                        >
                          {Assignedtasks}
                        </b>
                      </h3>
                      <FaHome
                        style={{
                          marginLeft: "200px",
                          marginTop: "-120px",
                          height: "70px",
                          width: "80px",
                          opacity: "0.5",
                          color: "#F3DA06",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          color: "#F3DA06",
                          marginTop: "-20px",
                          marginLeft: "10px",
                              fontFamily: "Roboto, sans-serif",

                        }}
                      >
                        Assigned Tasks
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4" style={{ marginLeft: "-20px" }}>
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      border: "0px",
                      backgroundColor: "white",
                      width: "410px",
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
                                fontFamily: "Roboto, sans-serif",

                            color: "red",
                          }}
                        >
                          {PendingApprovals}
                        </b>
                      </h3>
                      <FaHome
                        style={{
                          marginLeft: "200px",
                          marginTop: "-120px",
                          height: "70px",
                          width: "80px",
                          opacity: "0.5",
                          color: "red",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          color: "red",
                          marginTop: "-20px",
                          marginLeft: "10px",
                              fontFamily: "Roboto, sans-serif",

                        }}
                      >
                        Pending for Approval
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="piee"
                style={{ display: "flex", alignItems: "center" }}
              >
                <ul
                  style={{
                    marginTop: "-300px",
                    fontSize: "20px",
                    marginLeft: "-170px",
                    fontFamily: "Montserrat",
                    fontWeight: "1000",
                        fontFamily: "Roboto, sans-serif",

                  }}
                >
                  TASKS
                </ul>
                {/* <div className="piee" style={{ marginRight: "-50px" }}>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontFamily: "Algeria",
                      fontWeight: "1000",
                    }}
                  >
                    TOTAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "green", color: "green" }}
                    />
                  </p>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontFamily: "Algeria",
                      fontWeight: "1000",
                    }}
                  >
                    ASSIGNED :{" "}
                    <FaSquare
                      style={{ color: "#F3DA06", backgroundColor: "#F3DA06" }}
                    />
                  </p>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontWeight: "1000",
                      fontFamily: "Algeria",
                    }}
                  >
                    APPROVAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "red", color: "red" }}
                    />
                  </p>

                  <p
                    style={{
                      marginLeft: "-10px",
                      fontWeight: "1000",
                      fontFamily: "Algeria",
                    }}
                  >
                    REWARDED :{" "}
                    <FaSquare
                      style={{ backgroundColor: "black", color: "black" }}
                    />
                  </p>
                </div> */}

                <PieChart
                  className="pie"
                  style={{
                    width: "420px",
                    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.3) inset",
                    marginLeft: "-240px",
                  }}
                  width={400}
                  height={400}
                >
                  <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    style={{ color: "black", position:"relative", left:"100px"}}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="roww">
                <div
                  className="col-md-10 "
                  style={{
                    marginTop: "-400px",
                    marginLeft: "130px",
                    height: "200px",
                  }}
                >
                  <div
                    className="card"
                    style={{
                      // backgroundColor: "#CAFFF5",
                      marginBottom: "40px",
                      height: "400px",
                    }}
                  >
                    <h5
                      className="card-header font-weight-bold"
                      style={{
                        textAlign: "center",
                        fontFamily: "Algeria",
                        padding: "10px",
                        // backgroundColor: "#CAFFF5",
                        color: "black",
                        fontWeight: "1000",
                        fontSize: "20px",
                            fontFamily: "Roboto, sans-serif",

                      }}
                    >
                      EMPLOYEES
                    </h5>
                    <div className={`${styles.cardBody}`}>
                      <div className={`${styles.inputGroup} mb-3`}>
                        <input
                          type="text"
                          className={`${styles.formControl} form-control`}
                          placeholder="Search by Name or Company ID"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                          className={`${styles.inputGroupAppend} input-group-append`}
                        ></div>
                      </div>
                      <div
                        className={`${styles.listGroup} list-group`}
                        id="employee-list"
                      >
                        <div
                          className="list-group"
                          style={{
                            padding: "5px",
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {filteredEmployees.map((employee) => (
                            <div
                              key={employee.comId}
                              className="list-group-item"
                              style={{
                                padding: "2px",
                                backgroundColor: "#0000",
                                border: "0.1px dotted black",
                              }}
                            >
                              <div className="d-flex justify-content"></div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6
                                    className="font-weight-bold mb-0"
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "20px",
                                      fontWeight: "100",
                                      position: "relative",
                                      right: "25px",
                                      marginLeft: "0px",
                                      fontSize: "16px",
                                      height: "10px",
                                          fontFamily: "Roboto, sans-serif",

                                    }}
                                  >
                                    {employee.Name.toUpperCase()}
                                    <b
                                      style={{
                                        fontWeight: "100",
                                        fontSize: "14px",
                                            fontFamily: "Roboto, sans-serif",

                                      }}
                                    >
                                      ({employee.comId})
                                    </b>
                                  </h6>
                                  {/* <small style={{ fontWeight: "1000"}}>
                                  <div style={{marginTop:"10px"}}>
                                  {employee.comId}</div>
                                </small> */}
                                  <div>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: "8px",
                                        height: "8px",
                                        background:
                                          employee.condition === "online"
                                            ? "green"
                                            : "red",
                                        borderRadius: "50%",
                                        position: "relative",
                                        left: "200px",
                                        bottom: "40px",
                                        marginLeft: "180px",
                                        marginTop: "30px",
                                      }}
                                    ></span>

                                    <small
                                      style={{
                                        position: "relative",
                                        left: "200px",
                                        bottom: "39px",
                                        fontWeight: "bolder",
                                        fontSize: "1rem",
                                        fontFamily: "SecularOne"
                                      }}
                                    >
                                      {" "}
                                      {employee.condition}{" "}
                                    </small>
                                  </div>
                                </div>
                                <Link

onClick={() =>
  window.location.href = `/awardpage/${employee.Name}/${tokenn.name}/${employee.Wallet}`
}                             >
                                  <button
                                    className="btn btn-primary"
                                    onClick={togglePopup}
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "-10px",
                                      fontWeight: "000",
                                          fontFamily: "Roboto, sans-serif",

                                      position: "relative",
                                      left: "110px",
                                      color: "blue",
                                      backgroundColor: "white",
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
                                    Award
                                  </button>
                                </Link>
                                <Link
                                onClick={() =>
                                  window.location.href = `/assigntask/${employee.Name}/${tokenn.name}/${employee.Wallet}`
                                }  
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={togglePopup}
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "-10px",
                                          fontFamily: "Roboto, sans-serif",

                                      color: "blue",
                                      backgroundColor: "white",
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
                                    Assign Tasks
                                  </button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {" "}
                <div
                  className="col-md-8"
                  style={{
                    position:"relative",
                    left:"-300px",
                    marginTop: "230px",
                    marginLeft: "-20px",
                    width: "1290px",
                    height: "560px",
                  }}
                >
                  {" "}
                  <div className="modal-container">
                    {showModal && selectedTasks && (
                      <div className="card222">
                        <b
                          style={{
                            position: "relative",
                            bottom: "100px",
                            left: "150px",
                            fontSize: "1.4rem",
                          }}
                          onClick={handleClose}
                        >
                          X
                        </b>
                        {selectedTasks.map((task) => (
                          <div
                            key={task.task}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              border: "1px solid black",
                              padding: "5px",
                              margin: "5px 0",
                            }}
                          >
                            <p style={{ margin: "0 10px" }}>{task.empName}</p>

                            <p style={{ margin: "0 30px", textAlign: "left" }}>{task.task}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Calendar
                      className="my-calendar"
                      value={dateState}
                      onChange={changeDate}
                      tileContent={tileContent}
                    />
                  </div>
                  <div
                    className="cardd"
                    style={{
                      boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.3) inset",
                      // backgroundColor: "#17A2B8",
                      marginBottom: "40px",
                      width: "845px",
                      height: "400px",
                      marginLeft: "450px",
                      marginTop: "-390px",
                    }}
                  >
                    <h5
                      className="card-header font-weight-bold"
                      style={{
                        textAlign: "center",
                        fontFamily: "Algeria",
                        padding: "20px",
                        // backgroundColor: "#17A2B8",
                        color: "black",
                        fontWeight: "1000",
                        fontSize: "20px",
                            fontFamily: "Roboto, sans-serif",

                        paddingBottom: "1px",
                      }}
                    >
                      ASSIGNED TASKS
                    </h5>
                    <div className={`${styles.cardBody1}`}>
                      <div className={`${styles.inputGroup1} mb-3`}>
                        <input
                          type="text"
                          className={`${styles.formControl} form-control`}
                          placeholder="Search by Name"
                          value={search1}
                          onChange={(e) => setSearch1(e.target.value)}
                        />


                        <div
                          className={`${styles.inputGroupAppend1} input-group-append`}
                        ></div>
                      </div>
                      <div
                        className={`${styles.listGroup1} list-group`}
                        id="employee-list"
                      >
                        <div
                          className="list-group"
                          style={{
                            padding: "2px",
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {filteredTasks
                            .filter((task) =>
                              task.empName.toLowerCase().includes(search1.toLowerCase())
                            )
                            .map((task) => (
                              <div
                                key={task.task}
                                className="list-group-item"
                                style={{
                                  // backgroundColor: "#DDDDD2",
                                  border: "0.1px dotted black",
                                  padding: "2px",
                                }}
                              >
                                <div className="d-flex justify-content-between align-items-left">
                                  <div style={{ marginLeft: "-20px" }}>
                                    <h6
                                      className="font-weight-bold mb-0"
                                      style={{
                                        marginTop: "20px",
                                        fontWeight: "100",
                                        fontSize: "16px",
                                            fontFamily: "Roboto, sans-serif",

                                        marginLeft: "-0px",
                                        textAlign:"center"
                                      }}
                                    >
                                      {task.empName.toUpperCase()}
                                    </h6>
                                    <small
                                      style={{
                                        fontWeight: "100",
                                        // marginLeft: "20px",
                                            fontFamily: "Roboto, sans-serif",

                                        fontSize: "14px",
                                        marginLeft: "30px",
                                        textAlign:"left"
                                      }}
                                    >
                                      {task.task}
                                    </small>
                                  </div>
                                  <div style={{ textAlign: "center" }}>
                                    <p
                                      style={{
                                        display: "inline-block",
                                        marginRight: "10px",
                                        fontWeight: "1000",
                                        marginLeft: "200px",
                                        marginTop: "30px",
                                        fontFamily: "SecularOne"

                                      }}
                                    >
                                      Status:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline-block",
                                        color: "#ff0000",
                                        fontWeight: "1000",
                                        fontFamily: "SecularOne"

                                      }}
                                    >
                                      <b style={{ fontFamily: "SecularOne" }}>{task.status}</b>{" "}
                                    </p>
                                  </div>
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
                                      history.push(`/viewtask/${task._id}`);
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
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="calender-employee">
                    <div
                      style={{
                        position: "relative",
                        top: "20px",
                        width: "500px",
                        paddingRight: "50px",
                        position: "relative",
                        left: "50px",
                        top: "60px",
                      }}
                    >
                      <>
                        {/* <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p> */}
                      </>
                      {/* <Calendar
        style={{
          height: '400px',
          backgroundColor: 'white',
          position: 'relative',
          top: '150px',
          fontFamily: 'Montserrat',
          fontSize: '16px',
          color: 'black',
          fontWeight: 'bold',
          lineHeight: '1.5',
        }}
        value={currentDate}
        tileClassName={({ date }) =>
          isCurrentDate(date, currentDate) ? 'current-date' : ''
        }
        tileContent={tileContent}
      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default RealDash;
