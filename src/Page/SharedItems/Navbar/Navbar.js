import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const logOutUser = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  const menuItem = (
    <React.Fragment>
      <li>
        <Link to="/">
          <h4 className="text-xl text-white font-sans font-semibold">Home</h4>
        </Link>
      </li>
      <li>
        <Link to="/blog">
          <h4 className="text-xl text-white font-sans font-semibold">
            Wish List
          </h4>
        </Link>
      </li>
      <li>
        <Link to="/aboutUs">
          <h4 className="text-xl text-white font-sans font-semibold">
            About Us
          </h4>
        </Link>
      </li>
      {user?.uid && (
        <li>
          <Link to="/dashboard">
            <h4 className="text-xl text-white font-sans font-semibold">
              Dash Board
            </h4>
          </Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-blue-600/20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Everything you need
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItem}</ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <div className="flex items-center">
            {user?.photoURL ? (
              <div className="avatar">
                <div className="rounded-full me-5 w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="" src={user?.photoURL} />
                </div>
              </div>
            ) : (
              <p className="text-white me-5 font-mono text-2xl">
                {user?.displayName}
              </p>
            )}
            <button onClick={logOutUser} className="btn btn-active me-5">
              Sign Out
            </button>
          </div>
        ) : (
          <React.Fragment>
            <Link to="/login" className="btn btn-sm">
              Log in
            </Link>
            <Link to="/signUp" className="btn btn-sm ml-5">
              Sign Up
            </Link>
          </React.Fragment>
        )}
      </div>
      <label
        htmlFor="Dashboard-drawer"
        tabIndex={2}
        role="button"
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
