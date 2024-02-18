import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const paraStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const MoviesCard = ({ movie }) => {
  const { name, img, desc, _id } = movie;
  const [isOpen, setIsOpen] = useState(false);
  const [button, setButton] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setButton(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, [desc]);
  return (
    <div className="card w-56 bg-base-100 shadow-xl">
      <figure>
        <img className="h-[300px] w-full" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p ref={ref} style={isOpen ? null : paraStyles}>
          {desc}
        </p>
        {button && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-outline btn-xs btn-info"
          >
            {isOpen ? "Read less" : "Read more..."}
          </button>
        )}
        <div className="card-actions justify-end">
          <Link to={`/downloadMovie/${_id}`} className="badge badge-outline">
            Download
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
