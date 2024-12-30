import React, { useState } from "react";
import axios from "../url.js"
import { Link } from "react-router-dom";
import RegisterHeader from "../header/registerheader";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import "../../App.css";
import employeeImage from "./employees.png";
import styles from "../openPage/openpage.module.css";
import reg from "../openPage/r5.svg";
import "./reg.css";
import g from "../admin/w3.svg";
import empImg from "../../image/employee.jpg";
import "../../App.css";
import { FaHome } from "react-icons/fa";
import "./task.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Swal from "sweetalert2";
import NavBar from "../Headerr/Header.js";


export default function SignInPage() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const backgroundGradient = {
    background: "#FFFFFF)",
    height: "10%",
    width: "100%",
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/login`,
        { name, password },
        { withCredentials: true }
      );
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: '',
        confirmButtonColor: "#9A1B56",
        showConfirmationButton: false,
      }).then(() => {
      
        history.push('/employeehome');
      });
      

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect password");
      } else {
        setErrorMessage("Invalid name or password");
      }
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: "#9A1B56",
      });
    }
  };
  
  

  return (
    <div style={{ height: "20px" }}>
      <div  >
        <div className="text-center m-5-auto" style={{ marginTop: "-10px" }}>
          <p
            className="sec"
            style={{ fontSize: "36px", paddingTop: "30px", marginLeft: "60px" }}
          >
            <b style={{ fontFamily: "Secular One" }}></b>
          </p>
          <NavBar/>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
          >
           
            <form className="formm1" onSubmit={handleLogin}>
  <h2 className="style-0" style={{color:"blue"}}>Login </h2>
  <h2 className="head">Login to reach your rewards </h2>
  <div className="input-container22">
    <input
      type="text"
      title="name"
      className="input-container22-input"
      value={name}
      onChange={(e) => setname(e.target.value)}
      placeholder="Employee Name"
      required
    />
  </div>
  <div className="input-container23">
    <br />
    <div className="input-container23">
      <input
        type={showPassword ? 'text' : 'password'}
        title="Password"
        className="input-container22-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {showPassword ? (
        <AiOutlineEyeInvisible
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <AiOutlineEye
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  </div>
  <div>
    <button type="submit" className="submit1">Login</button>
  </div>
  <footer className="footer">
    <p className= "ff"> No Account? 
    <p className="signup-link">
      <Link to="/registercompany">Create an account</Link>.
    </p>
    </p>
  </footer>
</form>


          </div>
          {message && <p>{message}</p>}
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
}
const HeaderStyle = {
  width: "100%",
  height: "150vh",

  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};