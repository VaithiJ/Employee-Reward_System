// import React, { useState, useEffect, useRef } from "react";
// import { FaHome, FaTasks } from "react-icons/fa";
// import { FiPower } from "react-icons/fi";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { IoMdAddCircle } from "react-icons/io";
// import { BiTask } from "react-icons/bi";
// import { FiGift } from "react-icons/fi";
// import "./sidemenu1.css";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import { Link, useHistory } from 'react-router-dom'
// import {storage} from "../../firebase.js"
// import {v4 as uuidv4} from "uuid";
// import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";

// const SidebarMenu12 = () => {
//   const [isOpen, setIsOpen] = useState(false); // set isOpen to false by default
//   const menuRef = useRef(null);
//   const [cookies, setCookie, removeCookie] = useCookies([
//     "employee_token",
//     "name",
//   ]);
//   const [employees, setEmployees] = useState([]);
//   const [avatarUrl, setAvatarUrl] = useState("");
//   const [red, setred] = useState([]);
//   const toke = jwt_decode(cookies.employee_token);
//   const API_URL = "http://65.2.3.121:8800";
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleLogout = () => {
//     removeCookie("employee_token");
//     axios
//       .put(
//         `${API_URL}/condition/${toke.name}`,
//         { condition: "offline" },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         const condition = response.data.UpdatedCondition;
//         console.log(response.data.UpdatedCondition);
//       });
//   };

//   useEffect(() => {
//     axios
//     .get(`${API_URL}/comemps`, { withCredentials: true })
//     .then((response) => {
//       setEmployees(response.data.details.filter((details) => details.Name === toke.name));
     
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//     }, []);
//     useEffect(() => {
//       const fetchProfile = async () => {
//         try {
//           const response = await axios.put(`${API_URL}/updateprofile/${toke.name}`);
//           const red = response.data.updatedprofile;
//           setred(red);
    
//           const storageRef = ref(storage, `UserProfile/${toke.name}`);
//           const listResult = await listAll(storageRef);
    
//           const itemRef = listResult.items.find((ref) => ref.name === red.profile);
//           if (itemRef) {
//             const url = await getDownloadURL(itemRef);
//             setAvatarUrl(url);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };
    
//       fetchProfile();
//     }, []);




//   const handleClickOutside = (event) => {
//     if (
//       menuRef.current &&
//       !menuRef.current.contains(event.target) &&
//       event.target.id !== "menu-toggle"
//     ) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !event.target.closest(".sidebar-menu ul")
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [menuRef]);

//   const handleMouseLeave = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div ref={menuRef} style={{marginTop:"20px"}}>
//     <button className="btn btn-primary" id="menu-toggle" style={{background:"#009FBD",color:"#000000",width:"50px",border:"none",position:"relative",top:"5px"}} onMouseEnter={toggleSidebar}>
//        {isOpen ? <AiOutlineClose style={{fontSize:"2rem",position:"relative",right:"0px",}} /> : <AiOutlineMenu style={{fontSize:"2rem",position:"relative",right:"0px",height:"40px",width:"40px"}} />}
//      </button>
//      <nav className={`sidebar-menu ${isOpen ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
//        <div className="sidebar-header" ></div>
//        <ul className="list-unstyled" >
//        <li id="fonnn">
//        <a href="/userprofile" className="no-style" style={{textDecoration: "none"}}>
//   <img src={avatarUrl ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s"} alt="User Avatar" style={{
//     borderRadius:" 50%",
//     marginRight: "20px",
//     width: "150px",
//     height: "150px",
//     position: "relative",
//     top: "30px",
//     border: "none"}}></img>
// </a>

// <li style={{color:"white", marginLeft:"-20px",fontSize:"2rem",position:"relative",top:"30px"}} >
//     {toke.name} </li>
//     <br />
//      {employees.map((comp) => (
//     <li style={{fontSize:"0.8rem",position:"relative",top:"6px",color:"white",right:"10px"}}>{comp.comName} </li>
// ))}
// <Link to="/employeehome" style={{marginLeft:"-200px", fontSize:"20px",position:"relative",top:"20px"}}>
//       <FaHome className="fonnn"  /> Home
//     </Link>
// </li>

 
//          {/* <li id="fonnn">
//            <a href="/assigntask/:employeeId/:compName">
//              <BiTask className="icon" id="fonnn" /> Assign Tasks
//            </a>
//          </li> */}
       
//          <li>
//            <a href="/login"
//              style={{ color: "#FFFFFF",position:"relative",top:"20px",textAlign:"center" }}
//              onMouseOver={(e) => (e.target.style.color = "#000000")}
//              onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
//              onClick={handleLogout}
//            >
//              <FiPower style={{fontSize:"20px",marginLeft:"-100px",position:"relative",left:"30px",bottom:"2px"}} className="icon" id="fonnn" /> <b style={{fontSize:"18px",position:"relative",left:"30px" }}>Logout </b>
//            </a>
//          </li>
//        </ul>
//        <div className="sidebar-footer">
//          <button className="close-btn" onClick={toggleSidebar}>
//            {/* <AiOutlineClose /> */}
//          </button>
//        </div>
//      </nav>
//    </div>
//  );
// };

// export default SidebarMenu12;

import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaTasks } from "react-icons/fa";
import { FiPower } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { FiGift } from "react-icons/fi";
import "./sidemenu1.css";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import { useCookies } from "react-cookie";
import { Link, useHistory } from 'react-router-dom'
import {storage} from "../../firebase.js"
import {v4 as uuidv4} from "uuid";
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";

const SidebarMenu12 = () => {
  const [isOpen, setIsOpen] = useState(false); // set isOpen to false by default
  const menuRef = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "employee_token",
    "name",
  ]);
  const [employees, setEmployees] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [red, setred] = useState([]);
  const toke = jwt_decode(cookies.employee_token);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    removeCookie("employee_token");
    axios
      .put(
        `/condition/${toke.name}`,
        { condition: "offline" },
        { withCredentials: true }
      )
      .then((response) => {
        const condition = response.data.UpdatedCondition;
        console.log(response.data.UpdatedCondition);
      });
  };

  useEffect(() => {
    axios
    .get(`/comemps`, { withCredentials: true })
    .then((response) => {
      setEmployees(response.data.details.filter((details) => details.Name === toke.name));
     
    })
    .catch((error) => {
      console.log(error);
    });

    }, []);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.put(`/updateprofile/${toke.name}`);
          const red = response.data.updatedprofile;
          setred(red);
    
          const storageRef = ref(storage, `UserProfile/${toke.name}`);
          const listResult = await listAll(storageRef);
    
          const itemRef = listResult.items.find((ref) => ref.name === red.profile);
          if (itemRef) {
            const url = await getDownloadURL(itemRef);
            setAvatarUrl(url);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchProfile();
    }, []);




  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== "menu-toggle"
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".sidebar-menu ul")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} style={{marginTop:"20px"}}>
    <button className="btn btn-primary" id="menu-toggle" style={{background:"#FFFFFF",color:"#000000",width:"50px",border:"none",position:"relative",top:"5px"}} onMouseEnter={toggleSidebar}>
       {isOpen ? <AiOutlineClose style={{fontSize:"2rem",position:"relative",right:"0px",}} /> : <AiOutlineMenu style={{fontSize:"2rem",position:"relative",right:"0px",height:"40px",width:"40px"}} />}
     </button>
     <nav className={`sidebar-menu ${isOpen ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
       <div className="sidebar-header" ></div>
       <ul className="list-unstyled" >
       <li id="fonnn">
       <a href="/userprofile" className="no-style" style={{textDecoration: "none"}}>
  <img src={avatarUrl ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s"} alt="User Avatar" style={{
    borderRadius:" 50%",
    marginRight: "20px",
    width: "150px",
    height: "150px",
    position: "relative",
    top: "30px",
    border: "none"}}></img>
</a>

<li style={{color:"white", marginLeft:"-20px",fontSize:"2rem",position:"relative",top:"30px",fontFamily: "Secular One"}} >
    {toke.name} </li>
    <br />
     {employees.map((comp) => (
    <li style={{fontSize:"16px",position:"relative",top:"6px",color:"white",right:"10px",fontFamily:"Montserrat"}}>{comp.comName} </li>
))}
<Link to="/employeehome" style={{marginLeft:"-200px", fontSize:"14px",position:"relative",top:"20px",fontFamily:"Montserrat"}}>
      <FaHome className="fonnn"  /> <b style={{fontSize:"14px",fontFamily:"Montserrat"}}> HOME </b>
    </Link>
</li>

 
         {/* <li id="fonnn">
           <a href="/assigntask/:employeeId/:compName">
             <BiTask className="icon" id="fonnn" /> Assign Tasks
           </a>
         </li> */}
       
         <li>
           <a href="/login"
             style={{ color: "#FFFFFF",position:"relative",top:"20px" }}
             onMouseOver={(e) => (e.target.style.color = "#000000")}
             onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
             onClick={handleLogout}
           >
             <FiPower style={{fontSize:"14px",marginLeft:"-100px",position:"relative",right:"40px",bottom:"2px"}} className="icon" id="fonnn" /> <b style={{fontSize:"14px",position:"relative",right:"43px" ,fontFamily:"Montserrat"}}>LOGOUT </b>
           </a>
         </li>
       </ul>
       <div className="sidebar-footer">
         <button className="close-btn" onClick={toggleSidebar}>
           {/* <AiOutlineClose /> */}
         </button>
       </div>
     </nav>
   </div>
 );
};

export default SidebarMenu12;
