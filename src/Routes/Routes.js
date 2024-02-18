import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import DashBoardLayout from "../Page/Dashboard/DashBoardLayout/DashBoardLayout";
import Movies from "../Page/Home/Categories/Movies/Movies/Movies";
import Application from "../Page/Home/Categories/Application/Application/Application";
import Games from "../Page/Home/Categories/Application/Application/Games/Games/Games";
import PostAMovies from "./../Page/Dashboard/PostAMovies/PostAMovies/PostAMovies";
import PostGame from "./../Page/Dashboard/PostGame/PostGame/PostGame";
import BlogLayout from "../Page/Blog/BlogLayout/BlogLayout";
import Login from "../Page/Security/Login/Login";
import SignUp from "../Page/Security/SignUp/SignUp";
import AboutLayout from "../Page/AboutUS/AboutLayout/AboutLayout";
import AdForMovie from "../Page/Dashboard/AdForMovie/AdForMovie";
import MovieDownload from "../Page/SharedItems/Download/MovieDownLoad/MovieDownload";
import GameDownload from "../Page/SharedItems/Download/GameDownload/GameDownload";
import MoviesWishList from "../Page/Dashboard/MoviesWishList/MoviesWishList";
import GameWishList from "../Page/Dashboard/GameWishList/GameWishList";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import YourWishList from "../Page/Dashboard/YourWishList/YourWishList";
import AllUser from "../Page/Dashboard/AllUser/AllUser";
import AdminRoute from "./AdminRoute/AdminRoute";
import DIsplayError from "../Page/SharedItems/displayError/DIsplayError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DIsplayError></DIsplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/movie",
        element: <Movies></Movies>,
      },
      {
        path: "/app",
        element: <Application></Application>,
      },
      {
        path: "/game",
        element: <Games></Games>,
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <BlogLayout></BlogLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/aboutUs",
        element: <AboutLayout></AboutLayout>,
      },
      {
        path: "/downloadMovie/:id",
        element: (
          <PrivateRoute>
            <MovieDownload></MovieDownload>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `  https://everything-you-need-server-mahim13s-projects.vercel.app/movie/${params.id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          ),
      },
      {
        path: "/downloadGame/:id",
        element: (
          <PrivateRoute>
            <GameDownload></GameDownload>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `  https://everything-you-need-server-mahim13s-projects.vercel.app/games/${params.id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    errorElement: <DIsplayError></DIsplayError>,
    children: [
      {
        path: "/dashboard",
        element: <YourWishList></YourWishList>,
      },
      {
        path: "/dashboard/postMovie",
        element: (
          <AdminRoute>
            <PostAMovies></PostAMovies>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/postGame",
        element: (
          <AdminRoute>
            <PostGame></PostGame>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertised",
        element: (
          <AdminRoute>
            <AdForMovie></AdForMovie>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/movieList",
        element: <MoviesWishList></MoviesWishList>,
      },
      {
        path: "/dashboard/gameList",
        element: <GameWishList></GameWishList>,
      },
      {
        path: "/dashboard/yourWishlist",
        element: <YourWishList></YourWishList>,
      },
      {
        path: "/dashboard/allUser",
        element: <AllUser></AllUser>,
      },
    ],
  },
]);

export default router;
