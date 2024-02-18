import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import GamesCard from "./../GamesCard/GamesCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const Games = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 9;
  const searchRef = useRef();

  const { data: Games = [], isLoading } = useQuery({
    queryKey: ["game", page, perPage, search],
    queryFn: async () => {
      const res = await axios.get(
        `https://everything-you-need-server-mahim13s-projects.vercel.app/games?search=${search}&page=${page}&size=${perPage}`
      );
      const data = await res.data;
      return data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const count = Games?.count;
  const pages = Math.ceil(count / perPage);
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(searchRef.current.value);
  };

  return (
    <section>
      <Helmet>
        <title>Games</title>
      </Helmet>
      <div className="mt-6 ml-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search Game"
            className="input input-bordered input-primary"
          />
          <button className="btn btn-outline ml-5 btn-primary">
            <FaMagnifyingGlass size={30} />
          </button>
        </form>
      </div>
      <section className="my-16">
        <h4 className="mb-7 text-3xl text-white font-sans font-semibold">
          Download your desire game here
        </h4>
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          {Games.games?.map((game) => (
            <GamesCard key={game._id} game={game}></GamesCard>
          ))}
        </div>
      </section>
      <div className="w-full flex justify-center mt-20">
        <div className="join">
          {[...Array(pages)?.keys()].map((number) => (
            <input
              onClick={() => {
                setPage(number);
              }}
              key={number}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={number + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
