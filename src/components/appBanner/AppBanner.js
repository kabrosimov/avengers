import { Component } from "react";

import "./appBanner.css";

import avangers from "../../resources/img/Avengers.png";
import avangers_logo from "../../resources/img/Avengers_logo.png";

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={avangers} alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={avangers_logo} alt="Avengers logo" />
    </div>
  );
};

export default AppBanner;
