import React, { useContext } from "react";
import errorImg from "../../../Assets/image/error.png";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const DIsplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${errorImg})`,
      }}
      className="hero w-full bg-cover bg-center bg-no-repeat min-h-screen bg-base-200"
    >
      <div className="hero-content bg-black/70 text-center">
        <div className="max-w-md">
          <h4 className="text-3xl font-mono text-white font-semibold">
            Something went wrong
          </h4>
          <p className="text-red-600 text-xl font-semibold font-mono">
            {error?.statusText || error?.message}
          </p>
          <h6 className="mt-5 text-xl font-semibold text-white">
            Please{" "}
            <button onClick={handleLogOut} className="btn btn-xs btn-error">
              Sign Out{" "}
            </button>{" "}
            and <br /> Sign in again
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DIsplayError;
