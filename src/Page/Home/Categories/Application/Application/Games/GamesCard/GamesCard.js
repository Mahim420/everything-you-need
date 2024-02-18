import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const paraStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const GamesCard = ({ game }) => {
  const { name, desc, img, _id } = game;

  const [isOpen, setIsOpen] = useState(false);
  const [button, setButton] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setButton(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, [desc]);

  return (
    <div className="card w-56 bg-base-100 mt-9 shadow-xl">
      <figure>
        <img className="w-full h-56" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div>
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
        </div>
        <div className="card-actions justify-end">
          <Link to={`/downloadGame/${_id}`} className="badge badge-outline">
            Download
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GamesCard;
