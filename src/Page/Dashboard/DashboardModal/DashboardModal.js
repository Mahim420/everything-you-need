import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardModal = ({ movie, setMovie }) => {
  const { name, _id, img } = movie;

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleUpdateMovie = (movies) => {
    axios
      .put(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/movie/${_id}`,
        {
          name: movies.name,
          desc: movies.desc,
          link: movies.link,
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
                name: movies.name,
                desc: movies.desc,
                link: movies.link,
                img: img,
              },
              {
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("This poster is advertised now");
                navigate("/dashboard/advertised");
              }
            })
            .catch((err) => console.error(err));
        }

        setMovie(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <dialog id="AdModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(handleUpdateMovie)}>
              <section className="flex">
                <div>
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

export default DashboardModal;
