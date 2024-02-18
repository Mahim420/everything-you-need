import React from "react";
import BlogBanner from "../BlogBanner/BlogBanner";
import BlogQ from "../BlogQ/BlogQ";
import img from "../../../Assets/image/info.png";
import { Helmet } from "react-helmet-async";

const BlogLayout = () => {
  return (
    <div>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <BlogBanner></BlogBanner>
      <div className="hero mt-16 bg-base-200">
        <div className="hero-content items-center flex-col lg:flex-row-reverse">
          <div className="w-1/2">
            <img src={img} alt="" />
          </div>
          <div className="w-1/2 mt-[-90px] lg:h-[300px]">
            <BlogQ></BlogQ>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
