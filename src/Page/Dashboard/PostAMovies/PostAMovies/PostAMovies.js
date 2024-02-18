import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DashboardModal from "../../DashboardModal/DashboardModal";
import { useState } from "react";

const PostAMovies = () => {
  const { register, handleSubmit } = useForm();
  const [movie, setMovie] = useState(null);
  const search = "";
  const imageHosting = process.env.REACT_APP_imageBB_key;

  const { data: MoviesAd } = useQuery({
    queryKey: ["moviesAd"],
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

  const {
    data: Movies = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const res = await axios.get(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/movie?search=${search}`,
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
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleDeleteMovie = (movie) => {
    axios
      .delete(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/movie/${movie}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
          toast.success("Movies delete succesfully");
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePostMovie = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHosting}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          axios
            .post(
              "  https://everything-you-need-server-mahim13s-projects.vercel.app/movie",
              {
                name: data.title,
                desc: data.description,
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
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("New Movie add succesfully");
                refetch();
              }
            });
        }
      });
  };

  return (
    <div>
      <section>
        <h1 className="text-center text-4xl mb-9 font-mono font-bold">
          Post A new Movie Here
        </h1>
        <form onSubmit={handleSubmit(handlePostMovie)}>
          <div className="card w-96 bg-blue-600/20 shadow-xl">
            <figure className="flex border border-3 p-5 rounded flex-col">
              <div>
                <h3 className="text-2xl font-semibold font-serif">
                  Choose a Photo
                </h3>
              </div>
              <div className="mt-5">
                <input
                  {...register("img")}
                  placeholder="Name"
                  className="text-center"
                  type="file"
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                <input
                  className="input input-bordered input-primary"
                  {...register("title")}
                  placeholder="Choose a Name"
                  type="text"
                />
              </h2>
              <input
                className="input input-bordered input-primary"
                {...register("link")}
                placeholder="Add Link"
                type="text"
              />
              <textarea
                {...register("description")}
                className="textarea textarea-primary"
                placeholder="Enter Description"
              ></textarea>
              <div className="card-actions">
                <input value="Post" className="btn btn-primary" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="mt-32">
        <h1 className="text-white my-16 text-4xl font-sans text-center">
          Manage Your Movie
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Advertised</th>
                <th>Manage Movie</th>
              </tr>
            </thead>
            <tbody>
              {Movies.movies?.map((movie) => (
                <tr key={movie._id}>
                  <th>
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img alt="" src={movie.img} />
                      </div>
                    </div>
                  </th>
                  <td>{movie?.name}</td>
                  <td>
                    <label
                      onClick={() => {
                        setMovie(movie);
                      }}
                    >
                      {MoviesAd.length > 0 ? (
                        <button
                          disabled
                          className="btn btn-xs btn-outline btn-secondary"
                        >
                          There is already ad
                        </button>
                      ) : (
                        <button
                          className="btn btn-xs btn-outline btn-secondary"
                          onClick={() =>
                            document.getElementById("AdModal")?.showModal()
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
                        handleDeleteMovie(movie._id);
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
      {movie && (
        <DashboardModal setMovie={setMovie} movie={movie}></DashboardModal>
      )}
    </div>
  );
};

export default PostAMovies;
