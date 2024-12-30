import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import styles from "./dash.module.css";
// import { FaBars,FaUserPlus, FaTasks, FaGift } from "react-icons/fa";
import SidebarMenu from "./side.js";
import "./real.css"
import {
  FaBars,
  FaUserPlus,
  FaTasks,
  FaGift,
  FaHome,
  FaUsers,
} from "react-icons/fa";

function AdminDashBoard() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setusers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLinkClick = () => {
    setShowMenu(false);
    toggleMenu();
    console.log(showMenu);
  };

  const tokenn = jwt_decode(cookies.access_token);
  // const API_URL = "http://65.2.3.121:8800";

  useEffect(() => {
    axios
      .get(`/empdetails`, { withCredentials: true })
      .then((response) => {
        setEmployees(response.data.user);
        setusers(
          response.data.user.filter((user) => user.isOnboarded === false)
        );
        console.log("redd", response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("red", users);
  const filteredEmployees = employees.filter((employee) => {
    console.log(employee.isOnboarded);
    return (
      employee.isOnboarded === false &&
      (employee.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  
  return (
    <div style={{height:"800px"}}>
      <div className="row">
        <div style={{ height:"120px"}}>
        <div className="col-md-2">
          
          <div
            style={{ marginTop: "20px", marginLeft: "20px", display: "flex", width:"10px" }}
          >
            <SidebarMenu />
          </div>
        </div>
        <div
            className={styles.span}
            style={{
              fontSize: "40px",
              fontFamily: "Roboto, sans-serif",
              marginLeft: "-900px",
              marginTop:"-50px",

            }}
          >
           {tokenn.name.toUpperCase()}
          </div>
          </div><div  style={{backgroundColor:"#F9F8F8"}}>
        <div className="col-md-9">
          
          <div
            className="row"
            style={{ marginTop: "80px", marginLeft: "-280px" }}
          >
           
            <div className="row justify-content-center">
              <div className="col-md-3" style={{marginLeft:"590px", width:"945px"}}>
                <div
                  className="card"
                  style={{
margin:"auto",
                    color: "white",
                    height: "150px",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 2px 1px rgba(0,0,0,0.3) inset",
                    border: "0px",
                    backgroundColor: "#FFC107",
                    margin: "auto" /* centers horizontally */,
                    
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
                        }}
                      >
                        {users.length}
                      </b>
                    </h3>
                    <FaUsers
                      style={{
                        marginLeft: "200px",
                        marginTop: "-120px",
                        height: "70px",
                        width: "80px",
                        opacity: "0.5",
                        fontFamily:"Roboto, sans-serif"
                      }}
                    />
                    <br />
                    <div style={{ marginTop: "-20px", marginLeft: "10px" ,fontFamily: "Roboto, sans-serif"}}>
                      TOTAL USERS AVAILABLE
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div> 
          
          <div className="rowww">
            <div
              className="col-md-11 "
              style={{ marginTop: "-0px", marginLeft: "190px" }}
            >
              <div
                className="card"
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <h5
                  className="card-header font-weight-bold"
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontFamily: "Roboto, sans-serif",
                    padding: "20px",
                    fontWeight:"1000",
                    fontSize:"20px",
                    padding:"12px"
                  }}
                >
                  EMPLOYEE ONBOARDING
                </h5>
                <div className={`${styles.cardBody}`}>
                  <div className={`${styles.inputGroup} mb-3`}>
                    <input
                      type="text"
                      className={`${styles.formControl} form-control`}
                      placeholder="Search by Name "
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <div
                      className={`${styles.inputGroupAppend} input-group-append`}
                    >
                      <button
                        className={`${styles.btn} btn-primary` }
                        type="button"
                      >
                        Search
                      </button>
                    </div> */}
                  </div>
                  <div
                    className={`${styles.listGroup} list-group`}
                    id="employee-list"
                  >
                    <div
                      className={styles.listGroup}
                      style={{ maxHeight: "1050px", overflowY: "auto" }}
                    >
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee._id}
                          className="list-group-item"
                          style={{
                            backgroundColor: "#fff",
                            border: "0.1px dotted black",
                          }}
                        >
                          <div className="d-flex justify-content"></div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6
                                className="font-weight-bold mb-0"
                                style={{
                                  fontFamily: "Roboto, sans-serif",
                                  marginTop: "15px",
                                  fontWeight:"1000",
                                  marginLeft:"-0px",
                                  
                                }}
                              >
                                <b style={{fontSize:"18px",fontWeight:"100", fontFamily:"Roboto, sans-serif"}}>{employee.name.toUpperCase()}</b>  ({employee._id.slice(-8)})
                              </h6>
                            </div>
                            <button
  className="btn btn-primary"
  style={{ fontWeight: "1000" }}
  onClick={() => (window.location.href = `/empprofile/${employee._id}`)}
>
  View Profile
</button>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
      </div>
      
    </div>
    
  );
}
export default AdminDashBoard;
