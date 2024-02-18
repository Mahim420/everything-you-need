import React, { useContext } from "react";
import Navbar from "../../SharedItems/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../../Hooks/useAdmin";
import { AuthContext } from "../../../Context/AuthProvider";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const sideMenuBar = (
    <React.Fragment>
      <ul>
        {isAdmin && (
          <React.Fragment>
            <li className="mb-4">
              <Link to="/dashboard/allUser">All User</Link>
            </li>
            <li>
              <Link to="/dashboard/postGame">Post a Game</Link>
            </li>
            <li className="my-4">
              <Link to="/dashboard/postMovie">Post a Movie</Link>
            </li>

            <li className="mt-4">
              <Link to="/dashboard/advertised">Manage Advertise</Link>
            </li>

            <li className="mt-4">
              <Link to="/dashboard/movieList">Movies wishlist</Link>
            </li>
            <li className="mt-4">
              <Link to="/dashboard/gameList">Game wishlist</Link>
            </li>
          </React.Fragment>
        )}
        <li className="mt-4">
          <Link to="/dashboard/yourWishlist">Your wishlist</Link>
        </li>
      </ul>
    </React.Fragment>
  );
  return (
    <div>
      <Helmet>
        <title>Dash Board</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input
          id="Dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="Dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {sideMenuBar}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
