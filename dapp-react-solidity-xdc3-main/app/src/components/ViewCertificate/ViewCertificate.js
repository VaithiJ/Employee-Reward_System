import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import NavBar from '../Headerr/CertificateHeader.js'

const ViewCertificate = () => {
  const location = useLocation();
  const { employeeName, hash, tokencomp, tokendead, tokentask } = queryString.parse(location.search);


  const handleView = () => {
    window.open(`http://localhost:8800/listFiles?employeeName=${employeeName}&hash=${hash}`, '_self');
  };
  
  return (
    <div>
        <NavBar/>
      {/* <h1 style={{fontFamily:"Secular One",backgroundColor:"wheat", marginTop:"0px", padding:"20px"}}>Blockchain based Employee Reward System</h1> */}
      <div
        className="card"
        style={{
          width: "900px",
          height: "140px",
          flexDirection: "row",
          background: "#FFFFFF",
          margintop: "100px",
          position: "relative",
          top: "130px",
          left: "240px",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s'}
            alt="User Avatar"
            style={{
              border: "3px solid #ccc",
              boxShadow: "0px 0px 10px #ccc",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              zIndex: 1,
              position: "relative",
              top: "8px",
              left: "10px"
            }}
         
          />
       
        </div>
        {/* <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          alt="Avatar"
          style={{
            border: "3px solid #ccc",
            boxShadow: "0px 0px 10px #ccc",
            borderRadius: "50%",
            marginLeft: "5%",
            width: "120px",
            height: "120px",
            position: "relative",
            top: "10px",
          }}
        /> */}

        <div
          className="red"
          style={{
            flexDirection: "column",
            position: "relative",
            top: "35px",
            left: "30px",
            display: "flex",
          }}
        >
          <p style={{ display: "flex", alignItems: "center" }}>
            <b style={{ color: "#537FE7", marginRight: "10px", fontFamily: "sans-serif" }}>
              Name:
            </b>
            <span style={{ color: "#000000", fontFamily: "Segoe UI" }}>{employeeName}</span>
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            <b style={{ color: "#537FE7", marginRight: "10px", fontFamily: "sans-serif" }}>
              Company:
            </b>
            <span style={{ color: "#000000", fontFamily: "sans-serif" }}>{tokencomp}</span>
          </p>
          <p style={{ display: "flex", alignItems: "center", marginLeft:"200px", marginTop:"-77px" }}>
            <b style={{ color: "#537FE7", marginRight: "10px", fontFamily: "sans-serif" }}>
              Task:
            </b>
            <span style={{ color: "#000000", fontFamily: "sans-serif" }}>{tokentask}</span>
          </p>
           <p style={{ display: "flex", alignItems: "center", marginLeft:"200px", marginTop:"-3px" }}>
            <b style={{ color: "#212354", marginRight: "10px", fontFamily: "sans-serif" }}>
              Reward Coins:
            </b>
            <span style={{ color: "#000000", fontFamily: "Segoe UI" }}>{tokendead}</span>
          </p>
          <button style={{borderRadius:"20px", position:"relative", left:"500px", top:"-70px", padding:"5px",fontFamily: "secular one"}} onClick={handleView}>View Certificate</button>

        </div>
      </div>
    

    </div>
  );
};

export default ViewCertificate;
