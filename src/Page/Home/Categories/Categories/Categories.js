import React from "react";
import img2 from "../../../../Assets/Categories-image/game.png";
import img3 from "../../../../Assets/Categories-image/movie.png";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="mt-7 flex w-full items-center gap-7 justify-evenly">
      <div>
        <h4 className="text-white text-3xl text-bold font-mono text-center">
          Find Your <span>Desire</span>
        </h4>
        <div className="lg:flex justify-between mt-8 gap-5">
          <Link to="/game">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img src={img2} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-serif text-4xl text-white">
                  Game
                </h2>
                <p className="text-2xl text-red-600 font-semibold">
                  Download your free Application here
                </p>
              </div>
            </div>
          </Link>
          <Link to="/movie">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img src={img3} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-serif text-4xl text-white">
                  Movies
                </h2>
                <p className="text-2xl text-red-600 font-semibold">
                  Download your free Application here
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
