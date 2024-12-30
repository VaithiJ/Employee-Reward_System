
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaThumbsUp, FaHome , FaPowerOff} from 'react-icons/fa';
import { AiOutlineClose,AiOutlineMenu } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { FiGift ,FiPower,FiEdit3} from 'react-icons/fi';
import './SidebarMenu.css';
import {storage} from "../../firebase.js"
import {v4 as uuidv4} from "uuid";
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";
import jwt_decode from "jwt-decode";
import axios from "../url.js"
import { useCookies } from "react-cookie";
import { Link, useHistory } from 'react-router-dom';



const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // set isOpen to false by default
  const menuRef = useRef(null);


  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const toke = jwt_decode(cookies.access_token);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [red, setred] = useState([]);
  const [fileList, setFileList] = useState([]);
   

  const handleLogout = () => {
    removeCookie("access_token");
    localStorage.removeItem("WalletAddress");

  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== 'menu-toggle'
    ) {
      setIsOpen(false);
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const uploadFile = (fileUpload) => {
    if (fileUpload == null) return;
    const fileName = fileUpload.name + uuidv4();
    const fileRef = ref(storage, `UserProfile/Company/${toke.name}/${fileName}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { name: fileName, url: url }]);
        setAvatarUrl(url);
        const red = fileName;
        console.log(fileName);
        
        axios
          .put(
            `/updateprofileee/${toke.name}`,
            { profile: fileName },
            { withCredentials: true }
          )
          .then((response) => {
            const updated = response.data.updatedprofile;
            
          });
      });
    });
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.put(`/updateprofileee/${toke.name}`);
        const red = response.data.updatedprofileC;
        console.log("mpp",red)
        setred(red);
  
        const storageRef = ref(storage, `UserProfile/Company/${toke.name}`);
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
  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      uploadFile(file);
    });
    input.click();
  };
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.sidebar-menu ul')) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} style={{marginTop:"20px"}}>
     <button className="btn btn-primary" id="menu-toggle" style={{background:"#FFFFFF",border:"none",color:"#000000",width:"70px"}} onMouseEnter={toggleSidebar}>
        {isOpen ? <AiOutlineClose style={{fontSize:"2rem",position:"relative",right:"0px",}} /> : <AiOutlineMenu style={{fontSize:"2rem",position:"relative",right:"0px",}} />}
      </button>
      <nav className={`sidebar-menu ${isOpen ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
        <div className="sidebar-header" ></div>
        <ul className="list-unstyled" >
        <li id="fonnn">
        <img src={ avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s'} alt="User Avatar" style={{ 
           borderRadius: '50%',
        marginRight: '20px',
        width:"150px",
        height:"150px",
        marginTop:"30px"

      }} /> <button
      ref={buttonRef}
      onClick={handleButtonClick}
      style={{
        position: "relative",
        top: "80%",
        left: "48%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#007bff",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        border: "none",
        boxShadow: "0px 0px 10px #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      Edit
    </button> </li>

      <li style={{color:"white", marginLeft:"-20px", fontFamily:"Secular One", fontSize:"30px"}}>{toke.name}</li>
      <li id="fonnn" style={{marginTop:"40px"}} >
    <a href="/real"style={{marginLeft:"-200px", fontSize:"14px", fontFamily:"Montserrat"}}>
      <FaHome className="fonnn" /> HOME
    </a>
    </li>
  <li id="fonnn" style={{marginTop:"10px", marginBottom:"10px"}}>
    <Link to="/admindash" style={{marginLeft:"-80px",fontSize:"14px",fontFamily:"Montserrat"}}>
      <FaHome className="fonnn"  /> ONBOARD EMPLOYEES
    </Link>
  </li>
          {/* <li id="fonnn">
            <a href="/assigntask/:employeeId/:compName">
              <BiTask className="icon" id="fonnn" /> Assign Tasks
            </a>
          </li> */}
         <li id="fonnn" style={{marginBottom:"10px"}} >
    <a href="/reward" style={{marginLeft:"-180px",fontSize:"14px", fontFamily:"Montserrat", marginBottom:"10px"}}>
      <FaHome className="fonnn" onMouseOver={(e) => (e.target.style.color = "rgb(245, 71, 193)")}
              onMouseOut={(e) => (e.target.style.color = "#FFFFFF")} /> REWARD
    </a>
  </li>
          <li>
            <a href="/logincomp"
              style={{ color: "#FFFFFF"}}
              onMouseOver={(e) => (e.target.style.color = "rgb(245, 71, 193)")}
              onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
              onClick={handleLogout}
            >
              <FiPower style={{fontSize:"14px",marginLeft:"-192px"}} className="icon" id="fonnn" /> <b style={{fontSize:"14px",fontFamily:"Montserrat" }}>LOGOUT </b>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          {/* <button className="close-btn" onClick={toggleSidebar}> */}
            {/* <AiOutlineClose /> */}
          {/* </button> */}
        </div>
      </nav>
    </div>
  );
};

export default SidebarMenu;
