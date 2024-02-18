import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GameModal = ({ game, setGame }) => {
  const { name, img, _id } = game;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleUpdateGame = (games) => {
    axios
      .put(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/games/${_id}`,
        {
          name: games.name,
          desc: games.desc,
          link: games.link,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          axios
            .post(
              "  https://everything-you-need-server-mahim13s-projects.vercel.app/advertise",
              {
                name: games.name,
                desc: games.desc,
                link: games.link,
                img: img,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("Game Advertised successfully");
                navigate("/dashboard/advertised");
              }
            });
          setGame(null);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <React.Fragment>
      <dialog id="gameModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(handleUpdateGame)}>
              <section className="flex">
                <div>
                  <h5 className="mb-3">Choose New Photo</h5>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Update Name"
                    className="input input-bordered mb-3 input-primary "
                  />
                  <input
                    type="text"
                    {...register("link")}
                    placeholder="Update Link"
                    className="input input-bordered input-primary"
                  />
                </div>
                <div>
                  <textarea
                    {...register("desc")}
                    className="textarea h-full textarea-primary"
                    placeholder="Update Description"
                  ></textarea>
                </div>
              </section>
              <input
                className="btn btn-outline btn-secondary w-full mt-9"
                type="submit"
                value="Post"
              />
            </form>
          </div>
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default GameModal;
