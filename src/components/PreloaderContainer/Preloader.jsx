import React from "react";
import style from "./Preloader.module.css";

const Preloader = (props) => (
  <div className={style.wrapper}>
    <div className={style.preloader}>
      <div className={style.preloader__square}></div>
      <div className={style.preloader__square}></div>
      <div className={style.preloader__square}></div>
      <div className={style.preloader__square}></div>
    </div>
  </div>
);

export default Preloader;
