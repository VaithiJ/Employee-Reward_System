import React, {useState} from 'react'
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import './navbar.css'
import logo from "../../image/scroll-header-logo.svg"
import { Link } from 'react-router-dom';

const Navbar = () => {
const [toggleMenu, setToggleMenu] = useState(false);
return (
<div className="gpt3__navbar" style={{background:"#fff", height:"120px"}}>
<div className="gpt3__navbar-links">
<div className="gpt3__navbar-links_logo">
<img src={logo} alt="Logo" />
</div>
<div className="gpt3__navbar-links_container">
<p>
<Link to="/">Home</Link>
</p>
<p>
<Link to="/about">About</Link>
</p>
<p><a href="#features">Help</a></p>
</div>
</div>
<div className="gpt3__navbar-sign">
<Link to="/login"><button>Login</button></Link>
<Link to="/register"><button>Sign up</button></Link>
</div>
<div className="gpt3__navbar-menu">
{toggleMenu
? <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
: <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />}
{toggleMenu && (
<div className="gpt3__navbar-menu_container scale-up-center">
<div className="gpt3__navbar-menu_container-links">
<p><a href="#home">Home</a></p>
<p><a href="#wgpt3">Reward System</a></p>
<p><a href="#possibility">About</a></p>
<p><a href="#features">Help</a></p>
<p><a href="#blog">Library</a></p>
</div>
<div className="gpt3__navbar-menu_container-links-sign">
<Link to="/login"><button>Login</button></Link>
<Link to="/register"><button>Sign up</button></Link>
</div>
</div>
)}
</div>
</div>
);
}

export default Navbar;