import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const GameWishList = () => {
  const { data: gameWish, refetch } = useQuery({
    queryKey: ["gameWish"],
    queryFn: async () => {
      const res = await axios.get(
        "https://everything-you-need-server-mahim13s-projects.vercel.app/gameWishList",
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

  const handleDeleteWish = (game) => {
    axios
      .delete(
        `https://everything-you-need-server-mahim13s-projects.vercel.app/gameWishList/${game}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("delete wish succfully");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h4 className="text-3xl text-white font-semibold font-mono my-8">
        This is wishlist for Game
      </h4>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Message</th>
              <th>Delete wishlist</th>
            </tr>
          </thead>
          <tbody>
            {gameWish?.map((game, i) => (
              <tr key={game._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{game.message}</td>
                <td>
                  <button
                    onClick={() => handleDeleteWish(game._id)}
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

export default GameWishList;
