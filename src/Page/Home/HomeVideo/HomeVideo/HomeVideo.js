import React from "react";
import video from "../../../../Assets/Video/Home-video/home.mp4";

const HomeVideo = () => {
  return (
    <div className="relative mt-24">
      <div className="top-0 absolute left-0 h-full bg-black/50"></div>
      <video
        className="w-full h-[600px] object-cover"
        muted
        loop
        autoPlay
        src={video}
      ></video>
      <div className="absolute top-2/3 lg:top-2/3 lg:left-[50%]">
        <h2 className="text-3xl text-white font bold">
          DOWNLOAD FOR FREE{" "}
          <span className="text-red-500">GAME, APP & MOVIE</span>
        </h2>
      </div>
    </div>
  );
};

export default HomeVideo;
