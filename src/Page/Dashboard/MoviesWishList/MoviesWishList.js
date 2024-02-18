import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const MoviesWishList = () => {
  const { data: movieWish, refetch } = useQuery({
    queryKey: ["movieWishList"],
    queryFn: async () => {
      const res = await axios.get(
        "  https://everything-you-need-server-mahim13s-projects.vercel.app/movieWishlist",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.data;
      return data;
    },
  });

  const handleDeleteWish = (movie) => {
    axios
      .delete(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/movieWishlist/${movie}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Delete Movie wish Succesfully");
        }
      });
  };

  return (
    <div>
      <h4 className="text-3xl text-white font-semibold font-mono my-8">
        This is wishlist for Movie
      </h4>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Message</th>
              <th>Delete message</th>
            </tr>
          </thead>
          <tbody>
            {movieWish?.map((movie, i) => (
              <tr key={movie._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{movie.message}</td>
                <td>
                  <button
                    onClick={() => handleDeleteWish(movie._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesWishList;
