// import React, { useState } from "react";
// import axios from "../url.js"
// import { Link } from "react-router-dom";
// import Loginheader12 from "../header/compReg";
// import Footer from "../footer/Footer";
// import { useHistory } from "react-router-dom";
// import comp from "../../image/compreg.jpg";
// import "../../App.css";
// import styles from "../openPage/openpage.module.css";
// import reg from "../../components/openPage/r5.svg";
// import g from "./lay.svg";
// import companyImage from "../openPage/comp1.png";
// import "./reg.css";
// import { FaHome } from "react-icons/fa";
// // import parsePhoneNumberFromString from "libphonenumber-js";
// import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// export default function RegisterComp() {
//   const [comName, setUsercomName] = useState("");
//   const [password, setPassword] = useState("");
//   const [comEmail, setcomEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [comAddress, setcomAddress] = useState("");
//   const [walletAddress, setWallet] = useState("");
//   const [checkbox, setCheckbox] = useState(false);
//   const history = useHistory();
//   const isAdmin = false;
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const handleRegister = async (event) => {
//     event.preventDefault();

//     try {
//       // const phoneNumber = parsePhoneNumberFromString(mobile, 'zz);
//       // const formattedMobile = phoneNumber.format('INTERNATIONAL');
//       // console.log('formatted mobile:', formattedMobile);
//       const response = await axios.post(`/registercompany`, {
//         comName,
//         comAddress,
//         comEmail,
//         password,
//         mobile,
//         isAdmin,
//         walletAddress,
//       });
//       console.log("response", response.data);
//       // const phoneNumber = parsePhoneNumberFromString(mobile, 'ZZ');
//       // const CountryCode = phoneNumber?.countryCallingCode;

//       history.push("/logincomp", {
//         // comName: comName,
//         // comEmail: comEmail,
//         // mobile: mobile,
//         // comAddress: comAddress,
//         // doj: DOJ
//       });
//     } catch (error) {
//       console.error(error);
//       alert(error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ backgroundImage: `url(${g})`, height: "780px" }}>
//         {/* <Loginheader12 /> */}
//         <div
//           className={styles.image_cont}
//           id="empp"
//           style={{ marginRight: "30px" }}
//         >
//           <div
//             className="col-md-12 mx-auto my-auto text-left"
//             style={{
//               width: "100%",
//               marginLeft: "300px",
//             }}
//           >
//             <Link to="/">
//               <FaHome
//                 style={{
//                   marginLeft: "-1200px",
//                   marginTop: "20px",
//                   width: "70px",
//                   height: "40px",
//                   color: "black",
//                 }}
//               />
//             </Link>

//             <div style={{ display: "flex", flexDirection: "row" }}>
//               <img
//                 className="cmplg"
//                 src={companyImage}
//                 style={{
//                   width: "450px",
//                   height: "500px",
//                   marginTop: "-10px",
//                   marginLeft: "100px",
//                 }}
//               />
//               <p
//                 style={{
//                   fontSize: "18px",
//                   paddingTop: "30px",
//                   marginLeft: "-390px",
//                   marginTop: "400px",
//                 }}
//               >
//                 <b style={{ fontFamily: "Secular One" }}>
//                   Revolutionize Your Business with Blockchain <br />
//                   <b style={{ color: "red", fontFamily: "Secular One" }}>
//                     Register
//                   </b>{" "}
//                   Now and Empower Your Workforce!
//                 </b>
//               </p>
//               <form
//                 onSubmit={handleRegister}
//                 style={{
//                   marginLeft: "150px",
//                   borderRadius: "20px",
//                   marginBottom: "100px",
//                   boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
//                   backgroundColor: "transparent",
//                   width: "600px",
//                   height: "650px",
//                   marginTop: "-30px",
//                 }}
//               >
//                 <div style={{ textAlign: "center", margin: "auto" }}>
//                   <div>
//                     <h2
//                       className={styles.txt}
//                       style={{ marginLeft: "90px", fontFamily: "Secular One" }}
//                     >
//                       JOIN US
//                     </h2>
//                     <h5
//                       className={styles.p}
//                       style={{
//                         marginTop: "-40px",
//                         fontWeight: "bold",
//                         fontFamily: "Secular One",
//                       }}
//                     >
//                       CREATE YOUR COMPANY ACCOUNT
//                     </h5>
//                   </div>
//                 </div>
//                 <div style={{ color: "black" }}>
//                   <div className="row">
//                     <div className="col-md-6 form-group">
//                       <input
//                         type="text"
//                         placeholder="Company Name"
//                         className="form-control"
//                         value={comName}
//                         title="UsercomName"
//                         style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                         onChange={(e) => setUsercomName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     {/* <div className="inputGroup">
//     <input type="text" required="" autocomplete="off"/>
//     <label for="name">Name</label>
// </div> */}
//                     <div className="col-md-6 form-group">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Company Email"
//                         value={comEmail}
//                         title="comEmail"
//                         style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                         onChange={(e) => setcomEmail(e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div
//                       className="col-md-6 form-group"
//                       style={{
//                         position: "relative",
//                         bottom: "45px",
//                         right: "30px",
//                       }}
//                     >
//                       <PhoneInput
//                         placeholder="Enter Your Mobile Number"
//                         value={mobile}
//                         onChange={setMobile}
//                         inputClass="form-control"
//                         className="red"
//                         style={{ fontFamily: "Secular One" }}
//                         // dropdownClass="form-control"
//                         // style={{height:}}
//                         inputStyle={{
//                           height: "45px",
//                           width: "265px",
//                           fontWeight: "bold",
//                         }}
//                         // onBlur={() => {
//                         //   const phoneNumber = parsePhoneNumberFromString(
//                         //     mobile,
//                         //     "ZZ"
//                         //   );
//                         //   // const formattedPhoneNumber =
//                         //   //   phoneNumber?.formatInternational();
//                         //   // setMobile(formattedPhoneNumber || "");
//                         // }}
//                         country="in"
//                         countryCodeEditable={false}
//                         required
//                         dropdownStyle={{
//                           textAlign: 'left'
//                         }}
//                       />
//                     </div>

//                     <div className="col-md-6 form-group" style={{ position: "relative" }}>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control"
//                         placeholder="Password"
//                         value={password}
//                         title="password"
//                         style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       {showPassword ? (
//                         <AiOutlineEyeInvisible
//                           style={{
//                             position: "absolute",
//                             right: "10px",
//                             top: "50%",
//                             transform: "translateY(-83%) translateX(24%)",
//                             cursor: "pointer",
//                             height: "40%",
//                             width: "40%",
//                           }}
//                           onClick={togglePasswordVisibility}
//                         />
//                       ) : (
//                         <AiOutlineEye
//                           style={{
//                             position: "absolute",
//                             right: "30px",
//                             top: "50%",
//                             transform: "translateY(-83%) translateX(40%)",
//                             cursor: "pointer",
//                             height: "40%",
//                             width: "40%",
//                           }}
//                           onClick={togglePasswordVisibility}
//                         />
//                       )}
//                     </div>


//                     <div className="col-md-12 form-group">
//                       <input
//                         type="text"
//                         placeholder="Company Address"
//                         className="form-control"
//                         value={comAddress}
//                         title="comAddress"
//                         style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                         onChange={(e) => setcomAddress(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-12 form-group">
//                       <input
//                         type="text"
//                         placeholder="Wallet Address"
//                         className="form-control"
//                         value={walletAddress}
//                         title="wallet"
//                         style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                         onChange={(e) => setWallet(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6 form-group">
//                       <div style={{ marginLeft: "180px" }}>
//                         <label
//                           className="form-check-label"
//                           style={{
//                             color: "black",
//                             marginLeft: "-30px",
//                             fontFamily: "Secular One",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             checked={checkbox}
//                             onChange={(e) => setCheckbox(e.target.checked)}
//                             required
//                           />
//                           &nbsp;I_agree_to_the_terms_and_conditions
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     type="submit"
//                     className="btn btn-pri6ary"
//                     style={{ marginLeft: "0px" }}
//                   >
//                     Register
//                   </button>
//                   <div
//                     style={{
//                       marginTop: "30px",
//                       marginRight: "0px",
//                       fontFamily: "Secular One",
//                     }}
//                   >
//                     <p
//                       className="forgot-password text-right"
//                       style={{ fontFamily: "Secular One", fontWeight: "bolder" }}
//                     >
//                       Already registered.  <Link to="/logincomp" style={{
//                         color: "#FF7163",
//                         // textDecoration: "underline",
//                         // textDecorationColor: "red",
//                         fontFamily: "Secular One",
//                         fontWeight: "bolder",
//                       }}>Log In</Link>
//                     </p>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "../url.js"
import { Link } from "react-router-dom";
import Loginheader12 from "../header/compReg";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import comp from "../../image/compreg.jpg";
import "../../App.css";
import styles from "../openPage/openpage.module.css";
import reg from "../../components/openPage/r5.svg";
import g from "./lay.svg";
import companyImage from "../openPage/comp1.png";
import "./reg.css";
import { FaHome } from "react-icons/fa";
// import parsePhoneNumberFromString from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ersl from "../../image/erse.png";
import NavBar from "../Headerr/Header.js";

export default function RegisterComp() {
  const [comName, setUsercomName] = useState("");
  const [password, setPassword] = useState("");
  const [comEmail, setcomEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [comAddress, setcomAddress] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const history = useHistory();
  const isAdmin = false;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // const phoneNumber = parsePhoneNumberFromString(mobile, 'zz);
      // const formattedMobile = phoneNumber.format('INTERNATIONAL');
      // console.log('formatted mobile:', formattedMobile);
      const response = await axios.post(`/registercompany`, {
        comName,
        comAddress,
        comEmail,
        password,
        mobile,
        isAdmin,
        walletAddress,
      });
      console.log("response", response.data);
      // const phoneNumber = parsePhoneNumberFromString(mobile, 'ZZ');
      // const CountryCode = phoneNumber?.countryCallingCode;

      history.push("/logincomp", {
        // comName: comName,
        // comEmail: comEmail,
        // mobile: mobile,
        // comAddress: comAddress,
        // doj: DOJ
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div>
      <div>
        {/* <Loginheader12 /> */}
        <div
          className={styles.image_cont}
          id="empp"
          style={{ marginRight: "30px" }}
        >
          <div
            className="col-md-12 mx-auto my-auto text-left"
            style={{
              width: "100%",
              marginLeft: "300px",
            }}
          >
            <NavBar/>
           

            <div style={{ display: "flex", flexDirection: "row" }}>

              {/* <p
                style={{
                  fontSize: "18px",
                  paddingTop: "30px",
                  marginLeft: "-390px",
                  marginTop: "400px",
                }}
              >
                <b style={{ fontFamily: "Secular One" }}>
                  Revolutionize Your Business with Blockchain <br />
                  <b style={{ color: "red", fontFamily: "Secular One" }}>
                    Register
                  </b>{" "}
                  Now and Empower Your Workforce!
                </b>
              </p> */}
              <form
                onSubmit={handleRegister}
                className="form221"
              style={{
                marginTop:"150px",
                borderRadius:"1px"

               
              }}
              >
                <div >
                  <div >
                    <h2
                      className="title22"
                     style={{ marginLeft: "-30px", fontFamily: "Secular One" }}
                    >
                      JOIN US
                    </h2>
                    <h5
                      className="message"
                    style={{
                      marginLeft:"-30px"
                    }}
                    >
                      Create your company account
                    </h5>
                  </div>
                </div>
                <div style={{position:"relative", top:"-40px"}} >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="input"
                        value={comName}
                        title="UsercomName"
                        // style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setUsercomName(e.target.value)}
                        required
                      />
                    </div>
                    {/* <div className="inputGroup">
    <input type="text" required="" autocomplete="off"/>
    <label for="name">Name</label>
</div> */}
                    <div className="col-md-6 form-group">
                      <input
                        type="email"
                        className="input"
                        placeholder="Company Email"
                        value={comEmail}
                        title="comEmail"
                        // style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setcomEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group yess">
                      <PhoneInput
                        placeholder="Enter Your Mobile Number"
                        value={mobile}
                        onChange={setMobile}
                        inputClass="input input21"
                        country="in"
                        countryCodeEditable={false}
                        required
                        dropdownStyle={{
                          textAlign: 'left'
                        }}
                      />
                    </div>


                    <div className="col-md-6 form-group" style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input"
                        placeholder="Password"
                        value={password}
                        title="password"
                        // style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-83%) translateX(24%)",
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
                            transform: "translateY(-83%) translateX(40%)",
                            cursor: "pointer",
                            height: "40%",
                            width: "40%",
                          }}
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>


                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        placeholder="Company Address"
                        className="input"
                        value={comAddress}
                        title="comAddress"
                        // style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setcomAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        placeholder="Wallet Address"
                        className="input"
                        value={walletAddress}
                        title="wallet"
                        // style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                        onChange={(e) => setWallet(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <div style={{ marginLeft: "180px" }}>
                        {/* <label
                          className="form-check-label"
                          style={{
                            color: "black",
                            marginLeft: "-30px",
                            fontFamily: "Secular One",
                            fontWeight: "bold",
                          }}
                        >
                          <input
                            type="checkbox"
                            className="input"
                            checked={checkbox}
                            onChange={(e) => setCheckbox(e.target.checked)}
                            required
                          />
                          &nbsp;I_agree_to_the_terms_and_conditions
                        </label> */}
                      </div>
                    </div>
                  </div>
                  <button
                    // type="submit"
                    className="submit00000"
                  // style={{ marginLeft: "0px" }}
                  >
                    Register
                  </button>
                  <div
                    style={{
                      marginTop: "30px",
                      marginRight: "0px",
                      fontFamily: "Secular One",
                    }}
                  >
                    <p
                      className="signin222"
                    >
                      Already registered.  <Link to="/logincomp" >Log In</Link>
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
