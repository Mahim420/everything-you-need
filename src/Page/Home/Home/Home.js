import React from "react";
import HomeCarousel from "../HomeCarousel/HomeCarousel";
import ShocaseTextAnimation from "../Showcase/ShocaseTextAnimation/ShocaseTextAnimation";
import Categories from "../Categories/Categories/Categories";
import Advertise from "../Advertise/Advertise/Advertise";
import HomeVideo from "../HomeVideo/HomeVideo/HomeVideo";
import OwnerInfo from "../OwnerInfo/OwnerInfo/OwnerInfo";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Everything you need</title>
      </Helmet>
      <HomeCarousel></HomeCarousel>
      <ShocaseTextAnimation></ShocaseTextAnimation>
      <Categories></Categories>
      <Advertise></Advertise>
      <HomeVideo></HomeVideo>
      <OwnerInfo></OwnerInfo>
    </div>
  );
};

export default Home;
