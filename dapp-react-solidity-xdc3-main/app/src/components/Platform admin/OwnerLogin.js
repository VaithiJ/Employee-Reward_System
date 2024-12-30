import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../Headerr/Header.js";
import "../../App.css";
import "../admin/reg.css";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function OwnerLogin() {
  const [comName, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (comName === "0x570AC970E766A6E16A36799913fb7C4d4D083fBc" && password === "secureKloud123") {
        localStorage.setItem("Wallet Address","0x570AC970E766A6E16A36799913fb7C4d4D083fBc")
        history.push("/admin");
      } else {
        alert("Credentials are wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: "20px", marginTop: "100px" }}>
      <div>
        <div className="text-center m-5-auto" style={{ marginTop: "-10px" }}>
          <p className="sec" style={{ fontSize: "36px", paddingTop: "30px", marginLeft: "60px" }}>
            <b style={{ fontFamily: "Secular One" }}></b>
          </p>
          <NavBar />

          <div style={{ display: "flex", flexDirection: "row", marginTop: "-100px" }}>
            <form className="formm1" onSubmit={handleLogin}>
              <h2 className="style-0">Sign in as Admin</h2>
              <h2 className="head">Stay updated on your professional world</h2>
              <div className="input-container22">
                <input
                  type="text"
                  title="name"
                  className="input-container22-input"
                  value={comName}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Admin Wallet Address"
                  required
                />
              </div>
              <div className="input-container23">
                <br />
                <div className="input-container23">
                  <input
                    type={showPassword ? "text" : "password"}
                    title="Password"
                    className="input-container22-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="password-toggle-icon" onClick={togglePasswordVisibility} />
                  ) : (
                    <AiOutlineEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
              <div>
                <button type="submit" className="submit1">
                  Login
                </button>
              </div>
              <footer className="footer">
                <p className="ff">
                  No Account?
                  <p className="signup-link">
                    <Link to="/registercompany">Create an account</Link>.
                  </p>
                </p>
              </footer>
            </form>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
