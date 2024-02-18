import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Helmet } from "react-helmet-async";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRef, useState } from "react";

const Movies = () => {
  const [page, setPage] = useState(0);
  const perPage = 9;
  const [search, setSearch] = useState("");

  const { data: Movies = [], isLoading } = useQuery({
    queryKey: ["movie", page, perPage, search],
    queryFn: async () => {
      const res = await axios.get(
        `https://everything-you-need-server-mahim13s-projects.vercel.app/movie?search=${search}&page=${page}&size=${perPage}`
      );
      const data = await res.data;
      return data;
    },
  });

  const count = Movies.count;
  const pages = Math.ceil(count / perPage);
  const searchRef = useRef();
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(searchRef.current.value);
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <section>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div className="my-8 ml-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search Movie"
            className="input input-bordered input-primary"
          />
          <button className="btn btn-outline ml-5 btn-primary">
            <FaMagnifyingGlass size={30} />
          </button>
        </form>
      </div>

      <h1 className="text-3xl text-white font-semibold">
        Download your best Movies Here
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-9">
        {Movies?.movies?.map((movie) => (
          <MoviesCard key={movie._id} movie={movie}></MoviesCard>
        ))}
      </div>
      <div className="w-full flex justify-center mt-20">
        <div className="join">
          {[...Array(pages).keys()].map((number) => (
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

export default Movies;
