import React from "react";
import { useLoaderData } from "react-router-dom";

const GameDownload = () => {
  const games = useLoaderData();
  const { img, link, name, desc } = games;
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
      }}
      className="hero w-full bg-cover bg-center bg-no-repeat min-h-screen bg-base-200"
    >
      <div className="hero-content bg-black/70 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl text-white font-bold">{name}</h1>
          <p className="py-6 text-xl text-white font-sans">{desc}</p>
          <button className="btn btn-primary">
            <a target="blank" href={link}>
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDownload;
