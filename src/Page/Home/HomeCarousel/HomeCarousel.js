import React from "react";
import img1 from "../../../Assets/Banner-image/application.png";
import img2 from "../../../Assets/Banner-image/game.png";
import img3 from "../../../Assets/Banner-image/movie.png";
import "./HomeCarousel.css";

const HomeCarousel = () => {
  return (
    <div className="w-full carousel rounded-box">
      <div
        style={{ backgroundImage: `url(${img1})` }}
        className="carousel-item bg-cover bg-fixed relative overlay bg-center bg-no-repeat lg:h-[680px] w-full"
      >
        <div className="absolute w-full h-full">
          <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-white text-center text-6xl font-extrabold">
              Choose your free <span className="text-blue-600">App</span> here
            </h1>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${img2})` }}
        className="carousel-item relative overlay w-full bg-fixed sm:bg-cover bg-center bg-no-repeat h-[680px]"
      >
        <div className="absolute w-full h-full">
          <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-white text-center text-6xl font-extrabold">
              Choose your free <span className="text-blue-600">Game</span> here
            </h1>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${img3})` }}
        className="w-full overlay bg-fixed relative carousel-item bg-cover bg-no-repeat"
      >
        <div className="w-full h-full absolute">
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-white text-center text-6xl font-extrabold">
              Choose your free <span className="text-blue-600">Movie</span> here
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
