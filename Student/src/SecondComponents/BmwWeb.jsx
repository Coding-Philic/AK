import React from "react";
import Scroll from "../components/Scroll";
import Page from "../components/Page";
import Navbar from "../components/Navbar";

const BmwWeb = () => {
  return (
    <div className="">
      {/* Navbar */}
     <Navbar />

      {/* Video background */}
      <Scroll />

      {/* Sections on top */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "-3000px" }}>
        {/* Negative margin pulls sections up so they appear while video is scrolling */}
        <Page />
      </div>
    </div>
  );
};

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  padding: "20px",
  background: "rgba(0,0,0,0.7)",
  color: "white",
  zIndex: 10,
};

const navListStyle = {
  display: "flex",
  justifyContent: "space-around",
  listStyle: "none",
  margin: 0,
};

export default BmwWeb;
