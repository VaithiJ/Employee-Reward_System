import React, {useState} from 'react'
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import './navbar1.css'
import logo from "../../image/scroll-header-logo.svg"
import { Link } from 'react-router-dom';

const Loginheader12 = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggle = () => {
    setToggleMenu(!toggleMenu);
  }

  return (
    <div className="gpt3__navbar" style={{backgroundColor:"#FFB6C1", height:"100px"}}>
      <div className="gpt3__navbar-links" >
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="Logo"/> 
        </div>
        <div className="gpt3__navbar-links_container" >
        
        <p>
        <a href="/" style={{ color: '#131111', fontSize: '1rem' }}> <b>HOME</b></a>


          </p>
          <p>
            <a href="/about" style={{color:'#131111', fontSize: '1rem'}}> <b>ABOUT </b></a>
          </p>
          
          {/* <p><a href="#blog">Library</a></p> */}
        </div>
      </div>
      <div className="gpt3__navbar-sign" >
      <Link to="/RegisterCompany"><button className="btn-login" style={{marginRight:"10px", fontSize: '1rem', color:"black"}}><b>SIGN UP </b></button></Link>

      
        
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#ffffff" size={27} onClick={toggle} />
          : <RiMenu3Line color="#ffffff" size={27} onClick={toggle} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container slide-in-top">
          <div className="gpt3__navbar-menu_container-links" style={{color:"#ffffff"}}>
            <p><a href="#home">Home</a></p>
            <p><a href="#wgpt3">Reward System</a></p>
            <p><a href="#possibility">About</a></p>
            <p><a href="#features">Help</a></p>
            <p><a href="#blog">Library</a></p> 
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <Link to="/login"><p>Login</p></Link>
            <Link to="/register"><button className="btn-signup-menu">Sign up</button></Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Loginheader12 ;
