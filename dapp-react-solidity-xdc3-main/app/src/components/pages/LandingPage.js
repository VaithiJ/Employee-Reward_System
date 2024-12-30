import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer'
import "./land.css"
import '../../App.css'
import BackgroundImage from '../../image/Handshake.png'

export default function LandingPage() {
    return (
        <div><Navbar/>
        <header  className="header" style={ HeaderStyle }>
            <h1 className="main-title text-center">Employee Reward System</h1>
            <p className="main-para text-center">Join us now!!!</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        </header><Footer/>
        </div>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}