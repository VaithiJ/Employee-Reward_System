import React, {useState} from 'react'
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import './navbar.css'
import logo from "../../image/scroll-header-logo.svg"
import { Link } from 'react-router-dom';



const LogoutHeader = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="gpt3__navbar" style={{background:"transparent"}}>
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} /> 
        </div>
        <div className="gpt3__navbar-links_container" style={{color:"blue"}}>
        <p><a href="#ers" style={{color:'#131111', fontSize: '1rem'}}><b>ERS</b></a></p>
        <p>
            <Link to="/" style={{color:'#131111', fontSize: '1rem'}}><b> HOME </b></Link>
          </p>
          <p>
            <a href="#dd" style={{color:'#131111', fontSize: '1rem'}}><b> HELP</b> </a>
          </p>
          
        </div>
      </div>
      <div className="gpt3__navbar-sign">
      <Link to="/login" style={{color:'#131111', fontSize: '1rem'}}><button><b>LOGOUT</b></button></Link>

      
       
        
      </div>
      <div className="gpt3__navbar-menu" style={{height:"120px"}}>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links" style={{color:"blue"}}>
            <p><a href="#home">Home</a></p>
            <p><a href="#wgpt3">Reward System</a></p>
            <p><a href="#possibility">About</a></p>
            <p><a href="#features">Help</a></p>
             <p><a href="#blog">Library</a></p> 
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <Link><p>Login</p></Link>
            
            <button type="button">Login</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default LogoutHeader;