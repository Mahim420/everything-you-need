import React from "react";
import AboutBanner from "../AboutBanner/AboutBanner";
import { Helmet } from "react-helmet-async";

const AboutLayout = () => {
  return (
    <div>
      <Helmet>
        <title>About us</title>
      </Helmet>
      <AboutBanner></AboutBanner>
    </div>
  );
};

export default AboutLayout;
