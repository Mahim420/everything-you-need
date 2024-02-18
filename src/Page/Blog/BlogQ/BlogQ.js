import axios from "axios";
import React, { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const BlogQ = () => {
  const postGameRef = useRef();
  const postMovieRef = useRef();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGamePost = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://everything-you-need-server-mahim13s-projects.vercel.app/gameWishList",
        {
          message: postGameRef.current.value,
          email: user?.email,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Add to wishlist succesfully");
          navigate("/dashboard/yourWishlist");
        }
      });
  };

  const handleMoviePost = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://everything-you-need-server-mahim13s-projects.vercel.app/movieWishlist",
        {
          message: postMovieRef.current.value,
          email: user?.email,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Add to wishlist succesfully");
          navigate("/dashboard/yourWishlist");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <section className="my-11 rounded-r-lg h-full w-full">
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title font-mono text-3xl font-medium">
          Wish for your Game
        </div>
        <div className="collapse-content">
          <p>
            <input
              ref={postGameRef}
              type="text"
              placeholder="Enter game name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button
              onClick={handleGamePost}
              className="btn ml-5 btn-xs btn-outline btn-secondary"
            >
              Add to wishlist
            </button>
          </p>
        </div>
      </div>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title font-mono text-3xl font-medium">
          Wish for your Movie
        </div>
        <div className="collapse-content">
          <p>
            <input
              ref={postMovieRef}
              type="text"
              placeholder="Enter Movies name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button
              onClick={handleMoviePost}
              className="btn ml-5 btn-xs btn-outline btn-secondary"
            >
              Add to wishlist
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogQ;
