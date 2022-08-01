import React from "react";
import "./Preloader.css";

const Preloader: React.FC<{}> = (props) => (
  <div className="preloader-wrapper">
    <div className="preloader">
      <div className="preloader__square"></div>
      <div className="preloader__square"></div>
      <div className="preloader__square"></div>
      <div className="preloader__square"></div>
    </div>
  </div>
);

export default Preloader;
