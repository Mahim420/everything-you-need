import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GameModal from "../../GameModal/GameModal";

const PostGame = () => {
  const { register, handleSubmit } = useForm();
  const imgHosting = process.env.REACT_APP_imageBB_key;
  const search = "";
  const [game, setGame] = useState(null);

  //

  const { data: advertise = [] } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await axios.get(
        "  https://everything-you-need-server-mahim13s-projects.vercel.app/advertise",
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

  const { data: Games = [], refetch } = useQuery({
    queryKey: ["game"],
    queryFn: async () => {
      const res = await axios.get(
        `https://everything-you-need-server-mahim13s-projects.vercel.app/games?search=${search}`,
        {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );
      const data = await res.data;
      return data;
    },
  });

  const handlePostGame = (data) => {
    const img = data.img[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imgHosting}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          axios
            .post(
              "  https://everything-you-need-server-mahim13s-projects.vercel.app/games",
              {
                name: data.title,
                desc: data.desc,
                img: imgData.data.url,
                link: data.link,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((gamesData) => {
              if (gamesData.data.acknowledged) {
                toast.success("New game added successfull");
                refetch();
              }
            });
        }
      });
  };

  const handleDeleteGame = (game) => {
    axios
      .delete(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/games/${game}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Game Delete Successfully");
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit(handlePostGame)}>
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className="flex flex-col">
              <h1 className="text-xl font-semibold">Choose A photo</h1>
              <div className="mt-4 ml-16">
                <input
                  {...register("img")}
                  type="file"
                  className="input w-full max-w-xs"
                />
              </div>
            </figure>
            <div className="card-body">
              <input
                type="text"
                {...register("title")}
                placeholder="Add a title"
                className="input input-bordered input-primary"
              />
              <input
                type="text"
                {...register("link")}
                placeholder="Add a Download link"
                className="input input-bordered input-primary"
              />

              <textarea
                {...register("desc")}
                className="textarea textarea-primary"
                placeholder="write description"
              ></textarea>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Post</button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="mt-16">
        <h1 className="text-white my-16 text-4xl font-sans text-center">
          Manage Your game
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Advertised</th>
                <th>Manage Game</th>
              </tr>
            </thead>
            <tbody>
              {Games.games?.map((game) => (
                <tr key={game._id}>
                  <th>
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img alt="" src={game.img} />
                      </div>
                    </div>
                  </th>
                  <td>{game.name}</td>
                  <td>
                    <label
                      onClick={() => {
                        setGame(game);
                      }}
                    >
                      {advertise?.length > 0 ? (
                        <button
                          disabled
                          className="btn btn-xs btn-outline btn-secondary"
                        >
                          There is already Ad
                        </button>
                      ) : (
                        <button
                          className="btn btn-xs btn-outline btn-secondary"
                          onClick={() =>
                            document.getElementById("gameModal")?.showModal()
                          }
                        >
                          Advertised
                        </button>
                      )}
                    </label>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDeleteGame(game._id);
                      }}
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
      </section>
      {game && <GameModal setGame={setGame} game={game}></GameModal>}
    </div>
  );
};

export default PostGame;
