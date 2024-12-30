import React from "react";

const EmpButton = ({ connect }) => {
  console.log(connect);
  return (
    <div>
      <button
        style={{
          marginTop: "32px",
          marginLeft: "500px",
          position: "absolute",
          fontSize: "17px",
          backgroundColor: "#1196B0",
          borderRadius: "10px",
          fontFamily: "Secular One",
          padding: "8px",
          width: "120px",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#330078";
          // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#1196B0";
        }}
        onClick={connect}
      >
        Connect
      </button>
    </div>
  );
};

export default EmpButton;
