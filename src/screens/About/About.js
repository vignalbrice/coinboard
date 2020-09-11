import React from "react";
import Teams from "../../components/Teams/Teams";
import Crypto from "../../components/Crypto/Crypto";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="about">
      <div className="about_header">
        <p>About CoinBoard Website </p>
      </div>
      <div className="about_container">
        <p className="theteam">Who's the devteam ?</p>
        <Teams />
        <p className="thecrypto">What's a cryptocurrency ?</p>
        <Crypto />
        <Footer />
      </div>
    </div>
  );
};

export default About;
