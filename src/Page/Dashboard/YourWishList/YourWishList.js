import React from "react";
import MoviesTable from "./MoviesTable/MoviesTable";
import GamesTable from "./GamesTable/GamesTable";

const YourWishList = () => {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <section>
          <h5 className="mb-3 font-semibold font-mono text-xl">Movies Table</h5>
          <MoviesTable></MoviesTable>
        </section>
        <section>
          <h5 className="mb-3 font-semibold font-mono text-xl">Games Table</h5>
          <GamesTable></GamesTable>
        </section>
      </div>
    </div>
  );
};

export default YourWishList;
