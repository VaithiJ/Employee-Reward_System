import React, { useEffect, useState } from "react";
import styles from "./openpage.module.css";
import companyImage from "./comp1.png";
import employeeImage from "../../image/employee.jpg"
import ac from "./acc.png";
import NavBar from "../Headerr/Header.js";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Slideshow from "./carousel/car";
import "./openpage.module.css";
import bg from "./y.svg";
import g from "./sadd.svg";
// import roadmap from "./roadgif.gif";
import road from "./dia.gif"
import "./ap.css";
import sds from "./sds.png"


const Openpage = () => {
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all" >
        <NavBar />

      <div
        className={styles.open}
        style={{
          width: "100%",
          height: "1070px",
          backgroundImage: `url(${bg})`,
          marginTop:"80px"
        }}
      >

        <p style={{marginLeft:"1100px", position:"relative",top:"-80px", borderRadius:"20px", width:"150px", padding:"10px"}}>  
</p>

        <div
          style={{
            textAlign: "left",
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >

          <span
            className={styles.span}
            style={{ paddingTop: "200px", textShadow: "0px 0px 2px", fontFamily:"Secular One" }}
          >
            Employee Reward System{" "}
          </span>

        </div>

        <div>

          <img className="ac"
            src={ac}
            style={{
              width: "500px",
              height: "400px",
              float: "right",
              marginTop: "-190px",
              marginRight: "20px",
            }}
          />

        </div>
        <h1 className="home-title">
          <p
            className={styles.open1}
            style={{
              marginLeft: "100px",
              textAlign: "left",
              fontFamily: "Montserrat",
              lineHeight: "1.2",
            }}
          >
            Recognizing and Rewarding Employees <br /> with Excellence
          </p>
        </h1>
        <div>

          <Link to="/login">
            <button className={styles.btn} style={{ marginLeft: "-20px" }}>
              Employee
            </button>
          </Link>
          <Link to="/logincomp">
            <button className={styles.btn} style={{ marginLeft: "320px" }}>
              Company
            </button>
          </Link>
        </div>
      </div>
      <div  style={{ backgroundImage: `url(${g})` }}>
        <div className={styles.open}>
          <div className={styles.image_container} id="empp">
            <img
            className="emping"
              src={employeeImage}
              style={{
                width: "550px",
                height: "400px",
                marginTop: "-500px",
                marginLeft: "90px",
              }}
              alt="Employee"
            />
            <div className="emptext" style={{ marginTop: "-550px" }}>
              <h3 className={styles.txt} style={{fontFamily:"Secular One", fontSize:"40px"}}>EMPLOYEE</h3>
              <p
                className={styles.p}
                style={{
                  lineHeight: "1.5",
                  fontSize: "16px",
                  textAlign: "right",
                }}
              >
                The employee's role in this platform is to complete tasks
                assigned by the company admin and earn ERCoin rewards. They can
                also take certification courses to increase their value to the
                company. The platform stores certificates of completion on Firebase
                and records the hash on the XDC blockchain, providing lifelong
                proof of achievements. Overall, the employee's contributions and
                hard work are crucial to the success of the platform.
              </p>
            </div>
          </div>

          <div className={styles.image_container}>
            <div className="compp">
              <div className={styles.text_container}>
                <h3 className={styles.txt} style={{fontFamily:"Secular One", fontSize:"40px"}}>COMPANY</h3>

                <p
                  className={styles.p}
                  style={{
                    lineHeight: "1.5",
                    fontSize: "16px",
                    marginLeft: "100px",
                    textAlign: "left",
                  }}
                >
                  The company registers and onboard employees, assigns tasks and
                  certifications, and rewards them with ERCoin. The admin
                  approves tasks and stores certificates on Firebase, recording the
                  hash on the XDC blockchain. The platform streamlines task
                  management and reduces administrative workload. It promotes
                  transparency and fairness in task assignment and reward
                  distribution, creating a positive work environment. Overall,
                  the company supports and incentivizes its employees to drive
                  the platform's success.
                </p>
              </div>
            </div>

            <img
            className="coming"
              src={companyImage}
              style={{
                width: "750px",
                height: "550px",
                marginTop: "-100px",
                marginRight: "90px",
              }}
              alt="Employee"
            />
          </div>
        </div>

        <div
          className={styles.about}
          style={{ boxShadow: "0 0 10px rgba(10,100,0,0.3)" }}
        >
          <h2 className={styles.a1} style={{ color: "#F4F4F4" }}>
            <br />
            What is the problem we solve
          </h2>
          <br />
          <p
            className={styles.p}
            style={{ lineHeight: "1.5", color: "white", textAlign: "center" }}
          >
            The Employee Reward System addresses the issue of employees losing
            proof of their notable achievements or certifications when leaving a
            company. Through the system, employees can be rewarded with tokens
            for their completed tasks or achievements, which are stored on a
            blockchain. These tokens can then be redeemed for gift vouchers. The
            system provides a reliable and verifiable record of an employee's
            accomplishments, making it easier for recruiters to evaluate their
            qualifications.
          </p>

          <Link to="/about">
            <button className={styles.btn}>Learn More</button>
          </Link>
          <br />
        </div>
        <div  ><div>
          <img className={styles.bounce} src={sds} />
          <img
          className={styles.boun}
              src={road}
              style={{
                width: "700px",
                height: "1000px",
                marginTop: "-820px",
                marginLeft: "700px",
                // boxShadow: "2px 2px 27px -1px rgba(0,0,0,0.41)",
                // boxShadow: "0px 24px 64px rgba(38, 33, 74,0.1)"
                
                
              }}
              alt="Employee"
            /></div>
        <div className={styles.int}>
          <div
            className={styles.open}
            style={{
              marginLeft: "550px",
              marginTop: "100px",
              // boxShadow: "0 0 10px rgba(10,100,0,0.7)",
              width: "300px",
              height: "300px",
              marginBottom:"40px"
            }}
          >
            <h3 className={styles.a1} style={{fontFamily:"Secular One"}}>
              Stacks Used
            </h3>
            <Slideshow className={styles.a2} />
          </div>
        </div>
        </div>
       
        {/* <Footer /> */}
      </div>
     </div>
  );
};

export default Openpage;
