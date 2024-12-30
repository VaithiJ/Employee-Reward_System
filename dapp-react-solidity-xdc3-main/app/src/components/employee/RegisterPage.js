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
import g from "../admin/w4.svg";
import empImg from "../../image/employee.jpg";
import { FaHome } from "react-icons/fa";
import "./task.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Register() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(" ");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [DOJ, setDOJ] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [wallet, setWallet] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/register`, {
        name,
        mobile,
        address,
        DOJ,
        password,
        email,
        wallet,
      });
      console.log("hiighji");
      console.log(response.data);
      history.push("/login");
    } catch (error) {
      console.log("wrongyyyy");
      console.error(error);
    }
  };
  const customInputStyle = {
    fontFamily: "Secular One",
    fontWeight: "bold",
  };
  const CustomDatePickerInput = React.forwardRef(({ value, onClick, onKeyDown }, ref) => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const typedDate = new Date(e.target.value);
        if (!isNaN(typedDate)) {
          setDOJ(typedDate);
        }
      }
    };

    return (
      <input
        type="text"
        value={value}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        placeholder="Date Of Birth"
        className="form-control"
        style={customInputStyle}
        ref={ref}
      />
    );
  });
  return (
    <div style={{ height: "680px" }}>
      <div style={{ backgroundImage: `url(${g})` }}>
        {/* <Loginheader12 /> */}
        <div id="empp" style={{ marginLeft: "200px", marginRight: "100px" }}>
          <div
            className="col-md-18 mx-auto my-auto text-left"
            style={{
              width: "100%",
            }}
          >
            <Link to="/">
              <FaHome
                style={{
                  marginLeft: "200px",
                  marginTop: "30px",
                  marginLeft: "-1300px",
                  width: "50px",
                  height: "40px",
                  color: "black",
                }}
              />
            </Link>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="loginnnclass">
                <img
                  className="empp"
                  src={employeeImage}
                  style={{
                    width: "400px",
                    height: "350px",
                    marginLeft: "-00px",
                    marginTop: "50px",
                  }}
                />
              </div>
              <p
                className="go"
                style={{
                  fontSize: "18px",
                  paddingTop: "30px",
                  marginLeft: "-240px",
                  marginTop: "350px",
                }}
              >
                <b style={{ fontFamily: "Secular One" }}>
                  Be Part of the Future <br />
                  <b style={{ color: "red", fontFamily: "Secular One" }}>
                    Register
                  </b>{" "}
                  with Blockchain and Unlock Your Employee Rewards!
                </b>
              </p>

              <form
                className="empreg"
                onSubmit={handleRegister}
                style={{
                  marginLeft: "200px",
                  borderRadius: "50px",
                  marginBottom: "100px",
                  boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
                  height: "650px",
                  marginTop: "-20px",
                }}
              >
                <div style={{ textAlign: "center", margin: "auto" }}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "Secular One",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    >
                      JOIN US
                    </h2>
                    <h5
                      style={{
                        fontFamily: "Secular One",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      CREATE YOUR USER ACCOUNT
                    </h5>
                  </div>
                </div>
                <div style={{ color: "black" }}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        placeholder="User Name"
                        className="form-control"
                        value={name}
                        title="User Name"
                        style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        title="comEmail"
                        style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div
                      className="col-md-6 form-group"
                      style={{
                        position: "relative",
                        bottom: "45px",
                        right: "30px",
                      }}
                    >
                      <PhoneInput
                        placeholder="Enter Your Mobile Number"
                        value={mobile}
                        onChange={setMobile}
                        inputClass="form-control"
                        className="red"
                        style={{ fontFamily: "Secular One" }}
                        // dropdownClass="form-control"
                        // style={{height:}}
                        inputStyle={{
                          height: "45px",
                          fontWeight: "bold",
                        }}
                        // onBlur={() => {
                        //   const phoneNumber = parsePhoneNumberFromString(
                        //     mobile,
                        //     "ZZ"
                        //   );
                        //   // const formattedPhoneNumber =
                        //   //   phoneNumber?.formatInternational();
                        //   // setMobile(formattedPhoneNumber || "");
                        // }}
                        countryCodeEditable={false}
                        country="in"
                        required
                        dropdownStyle={{
                          textAlign: 'left'
                        }}
                      />
                    </div>

                    <div className="col-md-6 form-group" style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        title="password"
                        style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-80%) translateX(24%)",
                            cursor: "pointer",
                            height: "40%",
                            width: "40%",
                          }}
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            right: "30px",
                            top: "50%",
                            transform: "translateY(-80%) translateX(40%)",
                            cursor: "pointer",
                            height: "40%",
                            width: "40%",
                          }}
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    <div className="col-md-6 form-group" style={{ fontFamily: "Secular One" }}>
                      <DatePicker
                        selected={DOJ}
                        onChange={(date) => setDOJ(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Date of Birth"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control"
                        customInput={<CustomDatePickerInput />}
                        required
                      calendarClassName="custom-calendar"
                      wrapperClassName="custom-datepicker-wrapper"
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        placeholder="Address"
                        className="form-control"
                        value={address}
                        title="Address"
                        style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12 form-group">
                      <input
                        type="wallet address"
                        className="form-control"
                        placeholder="Wallet Address"
                        value={wallet}
                        title="wallet"
                        style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setWallet(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <div style={{ marginLeft: "110px" }}>
                        <label
                          className="form-check-label"
                          style={{
                            color: "black",
                            marginLeft: "30px",
                            fontFamily: "Secular One",
                            position: "relative",
                            left: "40px",
                            fontWeight: "bolder"
                          }}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            // style={{position:"relative",left:"45px"}}
                            checked={checkbox}
                            onChange={(e) => setCheckbox(e.target.checked)}
                            required
                          />
                          &nbsp;I_agree_to_the_terms_and_conditions
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginLeft: "0px", fontFamily: "Secular One", fontWeight: "bolder" }}
                  >
                    Register
                  </button>
                  <div style={{ marginTop: "30px", marginRight: "0px" }}>
                    <p
                      className="forgot-password text-right"
                      style={{ fontFamily: "Secular One", fontWeight: "bolder" }}
                    >
                      Already registered.<Link
                        to="/login"
                        style={{
                          color: "#146C94",
                          // textDecoration: "underline",
                          // textDecorationColor: "red",
                          fontFamily: "Secular One",
                          fontWeight: "bolder",
                        }}
                      >
                        Log In
                      </Link>

                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

const HeaderStyle = {
  backgroundImage: "url(/assets/images/register-bg.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  height: "100vh",
};