import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Onavbar from "./Onavbar";
import Footercr from "../footer/footercr";

const AboutPage = () => {
  const customFont = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
  };

  const headingGradient = {
    background: "linear-gradient(to right, #3259c9, #ff4b1f, #e633ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div style={{ backgroundColor: "white", height: "1000px", marginLeft: "30px" }}>
      <div style={{ marginLeft: "-100px" }}>
        <Onavbar />
      </div>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>

      <Row>
        <Col>
          <div className="opennnn" style={{ backgroundColor: "white" }}>
            <h1
              style={{
                fontSize: "3rem",
                textAlign: "center",
                ...customFont,
                ...headingGradient,
                position: "relative",
                top: "50px",
              }}
            >
              EMPLOYEE REWARD SYSTEM
            </h1>
            <h2
              id="about"
              style={{
                color: "#00008b",
                position: "relative",
                top: "70px",
                textAlign: "left",
              }}
            >
              <u>
                <b style={{ fontFamily: "SecularOne", fontSize: "20px" }}>
                  {" "}
                  ABOUT{" "}
                </b>
              </u>
            </h2>
            <h4
              style={{
                color: "#000",
                wordSpacing: "0.2em",
                textAlign: "left",
                position: "relative",
                top: "60px",
                fontFamily: "SecularOne",
                fontSize: "20px",
              }}
            >
              Maintaining accurate records of employee data and certifications is essential for many companies, but such records can often be difficult to manage and access. This lack of proper record-keeping can create challenges for retrieving and utilizing employee data, leading to inefficiencies and errors. However, by utilizing blockchain technology, such data can be securely stored in a tamper-proof, permanent manner. This makes it easier for employees to access and utilize their information whenever necessary, improving the efficiency of operations. Additionally, blockchain can be used to issue tokens as rewards for employees who have completed specific tasks, providing a tangible incentive to drive desired behaviors. The contract can be developed using XDC private blockchain to facilitate this process and ensure that employee data is effectively managed and utilized within the organization and also send tokens as rewards to the respective employees.
            </h4>
        
            <h2
              id="benefits"
              style={{
                color: "#00008b",
                position: "relative",
                top: "70px",
                textAlign: "left",
              }}
            >
              <u>
                {" "}
                <b style={{ fontFamily: "SecularOne", fontSize: "20px" }}>
                  BENEFITS{" "}
                </b>
              </u>
            </h2>
            <h4
              style={{
                color: "#000",
                wordSpacing: "0.2em",
                textAlign: "left",
                fontFamily: "SecularOne",
                position: "relative",
                top: "60px",
                fontSize: "22px",
              }}
            >
              The benefits of implementing a blockchain-based employee reward system include:
            </h4>
            <ul
              style={{
                color: "#000",
                wordSpacing: "0.2em",
                textAlign: "left",
                position: "relative",
                top: "60px",
                fontSize: "18px",
                fontFamily: "SecularOne",
              }}
            >
              <li style={{ fontFamily: "SecularOne" }}>
                Increased employee motivation and engagement through incentivizing task completion and rewarding exceptional performance.
              </li>
              <li style={{ fontFamily: "SecularOne" }}>
                Greater transparency and security through the use of blockchain technology to store and verify certificate hashes.
              </li>
              <li style={{ fontFamily: "SecularOne" }}>
                Permanent and easily accessible records of employee achievements for both employees and employers.
              </li>
              <li style={{ fontFamily: "SecularOne" }}>
                Encourages a positive work culture through the recognition of employee achievements and efforts.
              </li>
            </ul>
            <h2
              id="tech"
              style={{
                color: "#00008b",
                textAlign: "left",
                position: "relative",
                top: "65px",
              }}
            >
              <u>
                {" "}
                <b style={{ fontFamily: "SecularOne", fontSize: "20px" }}>
                  {" "}
                  TECHNOLOGY{" "}
                </b>{" "}
              </u>
            </h2>
            <h4
              style={{
                color: "#000",
                wordSpacing: "0.2em",
                textAlign: "left",
                fontFamily: "SecularOne",
                position: "relative",
                top: "50px",
                fontSize: "20px",
              }}
            >
              The use of blockchain technology in this project provides a secure and decentralized way of storing and managing employee rewards and certificates. By using blockchain, all the data related to employee rewards and certificates are stored in a tamper-proof manner, making it virtually impossible to manipulate or alter the data. This ensures that the records are accurate and reliable and can be easily accessed by authorized parties. Additionally, blockchain also offers increased transparency and accountability in the reward system, as all the transactions are visible to all the parties involved, promoting a fair and just reward system. Overall, blockchain technology offers a robust and reliable solution for managing employee rewards and certificates in a secure and efficient manner.
            </h4>
            <h2
              style={{
                color: "#00008b",
                textAlign: "left",
                position: "relative",
                top: "65px",
              }}
            >
              <u>
                {" "}
                <b style={{ fontFamily: "SecularOne", fontSize: "20px" }}>
                  FUTURE{" "}
                </b>
              </u>
            </h2>
            <h4
              style={{
                color: "#000",
                wordSpacing: "0.2em",
                textAlign: "left",
                position: "relative",
                fontFamily: "SecularOne",
                top: "50px",
                fontSize: "20px",
              }}
            >
              The future of employee reward systems lies in the development and integration of emerging technologies, such as blockchain and AI, to improve the accuracy, efficiency, and fairness of such systems. By leveraging these technologies, companies can more effectively motivate their employees to perform desired behaviors while also providing a more transparent and accessible system for the management of employee data and rewards.
            </h4>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutPage;
