import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const AllUser = () => {
  const {
    data: AllUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axios.get(
        "  https://everything-you-need-server-mahim13s-projects.vercel.app/users",
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

  const handleMakeAdmin = (id) => {
    fetch(
      `  https://everything-you-need-server-mahim13s-projects.vercel.app/users/admin/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin succesfully");
          refetch();
        }
      });
  };

  const handledeleteUser = (user) => {
    axios
      .delete(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/users/${user}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("User delete succefully");
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th>Manage Admin</th>
              <th>Manage User</th>
            </tr>
          </thead>
          <tbody>
            {AllUser?.map((user, i) => (
              <tr key={user._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "Admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-outline btn-warning"
                    >
                      Make admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handledeleteUser(user._id)}
                    className="btn btn-xs btn-outline btn-error"
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

export default AllUser;
