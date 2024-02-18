import React from "react";
import blogImg from "../../../Assets/Banner-image/blog.png";
// import "./Blog.css";

const BlogBanner = () => {
  return (
    <section
      className="h-screen relative before:content-none w-full bg-cover bg-center bg-no-repeat lg:h-[680px]"
      style={{ backgroundImage: `url(${blogImg})` }}
    >
      <div className="relative bg-black/60 flex justify-center items-center w-full h-screen">
        <div>
          <h1 className="text-center uppercase text-white text-4xl font-extrabold">
            Request Your desire
          </h1>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;
