import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Advertise = () => {
  const { data: Advertise } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const res = await axios.get(
        "https://everything-you-need-server-mahim13s-projects.vercel.app/advertise",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.data[0];
      return data;
    },
  });
  return (
    <section className="mt-16">
      <React.Fragment>
        <section className="mt-16">
          {Advertise ? (
            <div
              style={{ backgroundImage: `url(${Advertise?.img})` }}
              className="hero relative bg-top w-full min-h-screen bg-base-200"
            >
              <div className="hero-content bg-black/60 absolute text-center">
                <div className="max-w-md">
                  <h1 className="text-5xl font-bold text-white">
                    {Advertise?.name}
                  </h1>
                  <p className="py-6 text-white">{Advertise?.desc}</p>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-4xl text-blue-800 font-bold font-mono">
              NO AD Here
            </h1>
          )}
        </section>
      </React.Fragment>
    </section>
  );
};

export default Advertise;
