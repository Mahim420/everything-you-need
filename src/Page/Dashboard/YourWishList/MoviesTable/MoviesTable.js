import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MoviesTable = () => {
  const { user } = useContext(AuthContext);
  const { data: WishList = [], isLoading } = useQuery({
    queryKey: ["wishList"],
    queryFn: async () => {
      const res = await axios.get(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/movieWishlist?email=${user.email}`,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <section>
      <div className="overflow-x-auto border-red-500 border-5 border rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Wish List</th>
            </tr>
          </thead>
          <tbody>
            {WishList?.map((movieWish, i) => (
              <tr key={movieWish._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{movieWish.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MoviesTable;
