// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "../url.js"
// import reg from "../../components/openPage/r5.svg";
// import companyImage from "../openPage/comp1.png";
// import g from "./lay.svg";
// import styles from "../openPage/openpage.module.css";

// import Footer from "../footer/Footer";
// import { useHistory } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import Swal from "sweetalert2";


// import "../../App.css";
// import "./reg.css";

// import Loginheader12 from "../header/comploginheader";

// // const API_URL = "http://65.2.3.121:8800";

// export default function SignInPage() {
//   const [comName, setname] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [message, setMessage] = useState("");
//   const history = useHistory();
//   const [showPassword, setShowPassword] = useState(false);
//   const backgroundGradient = {
//     background: "#FFFFFF",
//     height: "100%",
//     width: "100%",
//   };
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         `/logincomp`,
//         {
//           comName,
//           password,
//         },
//         { withCredentials: true }
//       );
//       //  setMessage(response.data.message)

//       //  console.log(response.data);

//       // Redirect to admin page on successful login


//       // Swal.fire({

//       //    icon: 'success',

//       //   title: 'Login successful!',

//       //    text: 'You are now logged in.',

//       //    confirmButtonColor:"#9A1B56"

//       //    })
//       window.location.href = '/real'
//     } catch (error) {
//       console.error(error);

//       if (error.response && error.response.status === 404) {
//         // User not found
//         setErrorMessage("name not found");
//       } else if (error.response && error.response.status === 400) {
//         // Incorrect password
//         setErrorMessage("Incorrect password");
//       } else {
//         // Other error
//         setErrorMessage("An error occurred");
//       }
//       const alertMessage = errorMessage || "Invalid Credentials";
//       alert(alertMessage);
//     }
//   };

//   return (
//     <div style={{ height: "20px" }}>
//       <div style={{ backgroundImage: `url(${g})` }}>
//         <div className="text-center m-5-auto" style={{ marginTop: "-10px" }}>
//           <p
//             className="sec"
//             style={{ fontSize: "36px", paddingTop: "30px", marginLeft: "60px" }}
//           >
//             <b style={{ fontFamily: "Secular One" }}></b>
//           </p>
//           <Link to="/">
//             <FaHome
//               className="fah"
//               style={{
//                 marginLeft: "-1250px",
//                 marginTop: "-0px",
//                 width: "70px",
//                 height: "40px",
//                 color: "black",
//               }}
//             />
//           </Link>

//           <div
//             style={{ display: "flex", flexDirection: "row", marginTop: "-100px" }}
//           >
//             <img
//               className="cmplg"
//               src={companyImage}
//               style={{
//                 width: "450px",
//                 height: "500px",
//                 marginLeft: "170px",
//                 marginTop: "30px",
//               }}
//             />
//             <p
//               style={{
//                 borderRadius: "10px",
//                 fontFamily: "Secular One",
//                 paddingTop: "20px",
//                 padding: "20px",
//                 marginTop: "450px",
//                 marginLeft: "-480px",
//                 height: "150px",
//                 fontSize: "18px"
//               }}
//             >
//               Securely Connect to Your Business  <br />
//               Login to Your Blockchain-Enabled <b style={{ fontFamily: "Secular One", color: "red" }}>Company</b> Portal Now!
//             </p>
//             <form
//               className="cmplgg"
//               onSubmit={handleLogin}
//               style={{
//                 height: "500px",
//                 marginTop: "80px",
//                 marginLeft: "155px",
//                 marginRight: "50px",
//                 marginBottom: "100px",
//                 boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
//                 borderRadius: "20px",
//                 backgroundColor: "transparent",
//               }}
//             >
//               <h2
//                 className={styles.txt}
//                 style={{
//                   marginLeft: "70px",
//                   marginTop: "30px",
//                   fontSize: "30px",
//                   fontFamily: "Secular One",
//                 }}
//               >
//                 Login
//               </h2>
//               <p>
//                 <label style={{ fontFamily: "Secular One", fontWeight: "bolder" }}>COMPANY NAME</label>
//                 <br />
//                 <input
//                   type="text"
//                   title="name"
//                   value={comName}
//                   style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                   onChange={(e) => setname(e.target.value)}
//                   required
//                 />
//               </p>
//               <p>
//                 <label style={{ fontFamily: "Secular One", fontWeight: "bolder" }}>PASSWORD</label>
//                 <Link to="/forget-password">
//                   <label className="right-label" style={{ fontFamily: "Secular One", fontWeight: "bolder" }}>Forget password?</label>
//                 </Link>
//                 <br />
//                 <p>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     title="Password"
//                     value={password}
//                     style={{ fontFamily: "Secular One", fontWeight: "bold" }}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   {showPassword ? (
//                     <AiOutlineEyeInvisible
//                       style={{
//                         position: "relative",
//                         left: "100px",
//                         top: "5px",
//                         transform: "translateY(-250%)",
//                         cursor: "pointer",
//                         height: "10%",
//                         width: "10%"
//                       }}
//                       onClick={togglePasswordVisibility}
//                     />
//                   ) : (
//                     <AiOutlineEye
//                       style={{
//                         position: "relative",
//                         left: "100px",
//                         top: "5px",
//                         transform: "translateY(-250%)",
//                         cursor: "pointer",
//                         height: "10%",
//                         width: "10%"
//                       }}
//                       onClick={togglePasswordVisibility}
//                     />
//                   )}
//                 </p>
//               </p>
//               <p>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Login
//                 </button>
//               </p>
//               <footer>
//                 <p style={{ fontFamily: "Secular One" }}>
//                   <Link
//                     to="/registercompany"
//                     style={{
//                       color: "#4649EE",
//                       // textDecoration: "underline",
//                       // textDecorationColor: "#4649EE",
//                       fontFamily: "Secular One",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {" "}
//                     Create an account
//                   </Link>
//                   .
//                 </p>
//                 <p style={{ fontFamily: "Secular One" }}>
//                   <Link to="/" style={{
//                     color: "#4649EE",
//                     // textDecoration: "underline",
//                     // textDecorationColor: "red",
//                     fontFamily: "Secular One",
//                     fontWeight: "bolder",
//                   }}>
//                     Back to Homepage
//                   </Link>
//                   .
//                 </p>
//               </footer>
//             </form>
//           </div>
//           {message && <p>{message}</p>}
//         </div>

//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// }
// const HeaderStyle = {
//   width: "100%",
//   height: "150vh",

//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
// };



import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../url.js"
import reg from "../../components/openPage/r5.svg";
import companyImage from "../openPage/comp1.png";
import g from "./lay.svg";
import styles from "../openPage/openpage.module.css";
import NavBar from "../Headerr/Header.js";

import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Swal from "sweetalert2";


import "../../App.css";
import "./reg.css";

import Loginheader12 from "../header/comploginheader";

// const API_URL = "http://localhost:8800";

export default function SignInPage() {
  const [comName, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const backgroundGradient = {
    background: "#FFFFFF",
    height: "100%",
    width: "100%",
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `/logincomp`,
        {
          comName,
          password,
        },
        { withCredentials: true }
      );
      //  setMessage(response.data.message)

      //  console.log(response.data);

      // Redirect to admin page on successful login


      // Swal.fire({

      //    icon: 'success',

      //   title: 'Login successful!',

      //    text: 'You are now logged in.',

      //    confirmButtonColor:"#9A1B56"

      //    })
      window.location.href = '/real'
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 404) {
        // User not found
        setErrorMessage("name not found");
      } else if (error.response && error.response.status === 400) {
        // Incorrect password
        setErrorMessage("Incorrect password");
      } else {
        // Other error
        setErrorMessage("An error occurred");
      }
      const alertMessage = errorMessage || "Invalid Credentials";
      alert(alertMessage);
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
            {/* <img
              className="cmplg"
              src={companyImage}
              style={{
                width: "450px",
                height: "500px",
                marginLeft: "170px",
                marginTop: "30px",
              }}
            /> */}
            {/* <p
              style={{
                borderRadius: "10px",
                fontFamily: "Secular One",
                paddingTop: "20px",
                padding: "20px",
                marginTop: "450px",
                marginLeft: "-480px",
                height: "150px",
                fontSize: "18px"
              }}
            >
              Securely Connect to Your Business  <br />
              Login to Your Blockchain-Enabled <b style={{ fontFamily: "Secular One", color: "red" }}>Company</b> Portal Now!
            </p> */}
            <form className="formm1" onSubmit={handleLogin}>
  <h2 className="style-0" style={{color:"blue"}}>Sign in </h2>
  <h2 className="head">Stay updated on your professional world </h2>
  <div className="input-container22">
    <input
      type="text"
      title="name"
      className="input-container22-input"
      value={comName}
      onChange={(e) => setname(e.target.value)}
      placeholder="Company Name"
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
