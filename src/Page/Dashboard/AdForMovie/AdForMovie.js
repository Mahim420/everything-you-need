import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const AdForMovie = () => {
  const {
    data: Advertised = [],
    refetch,
    isLoading,
  } = useQuery({
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

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleMovieRemove = (movie) => {
    axios
      .delete(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/advertise/${movie}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Remove sucessfully");
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Manage Ad</th>
            </tr>
          </thead>
          <tbody>
            {Advertised?.map((advertise, i) => (
              <tr key={advertise._id}>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img alt="" src={advertise.img} />
                    </div>
                  </div>
                </th>
                <td>{advertise.name}</td>
                <td>
                  <button
                    onClick={() => {
                      handleMovieRemove(advertise._id);
                    }}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Remove
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

export default AdForMovie;
