import React from "react";
import hacker from "../../../Assets/Banner-image/hacker.png";
import { Link } from "react-router-dom";

const AboutBanner = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={hacker} alt="" className="lg:w-1/2 rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">About Us !!!</h1>
          <p className="py-6">
            We are provide Update Movies link and game Link. You can download
            here free Game & Movie in easiest way. The Link Will be update on
            Your demand. You can visit here very easiest way. You have to Login
            first to download the game & movie
          </p>
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
