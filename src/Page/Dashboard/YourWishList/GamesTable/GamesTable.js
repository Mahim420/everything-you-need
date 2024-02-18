import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GamesTable = () => {
  const { user } = useContext(AuthContext);
  const { data: GameWishList = [], isLoading } = useQuery({
    queryKey: ["gameWishList"],
    queryFn: async () => {
      const res = await axios.get(
        `https://everything-you-need-server-mahim13s-projects.vercel.app/gameWishList?email=${user.email}`,
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
      <div className="overflow-x-auto rounded-lg border-blue-500 border-5 border">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Wish List</th>
            </tr>
          </thead>
          <tbody>
            {GameWishList?.map((gameWish, i) => (
              <tr key={gameWish._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{gameWish.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GamesTable;
