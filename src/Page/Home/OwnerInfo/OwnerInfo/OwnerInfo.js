import React from "react";
import img from "../../../../Assets/image/info.png";
import { Link } from "react-router-dom";

const OwnerInfo = () => {
  return (
    <div className="mt-16">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={img}
            className="lg:w-1/2 w-3/4 rounded-lg shadow-2xl"
            alt=""
          />
          <div>
            <h1 className="lg:text-5xl text-xl uppercase font-bold">
              Every thing you need
            </h1>
            <p className="py-6">
              You can download here any game and movie for free on your request
            </p>
            <Link to="/login" className="btn btn-primary text-white">
              Your request
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;
