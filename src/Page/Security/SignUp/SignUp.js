import React, { useContext, useState } from "react";
import img from "../../../Assets/image/security.png";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../../../Hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser, handleGoogleSignIn } =
    useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");

  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const [token] = useToken(createdUserEmail);

  if (token) {
    navigate("/");
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        if (res.user) {
          saveUser(res.user.displayName, res?.user?.email);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSignUp = (data) => {
    setSignupError("");
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then((res) => {
            saveUser(user.displayName, user.email);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        setSignupError(error.message);
      });
  };

  const saveUser = (name, email) => {
    axios
      .post(
        `  https://everything-you-need-server-mahim13s-projects.vercel.app/users?email=${email}`,
        {
          name: name,
          email: email,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          setCreatedUserEmail(email);
          toast.success("User created Successfully");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section
        style={{
          backgroundImage: `url(${img})`,
        }}
        className="flex w-full bg-center bg-cover h-screen justify-center items-center"
      >
        <div className="border-4 p-4 bg-black/50 border-blue-800 rounded-lg flex justify-center w-80">
          <form onSubmit={handleSubmit(handleSignUp)}>
            <h4 className="mb-5 text-white font-bold text-2xl">Sign Up</h4>
            <input
              type="text"
              {...register("name", { required: "name is required" })}
              placeholder="Enter name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            {errors.name && (
              <p
                className="text-red-500 text-xl font-semibold font-mono"
                role="alert"
              >
                {errors.name?.message}
              </p>
            )}
            <input
              type="text"
              {...register("email", { required: "email is required" })}
              placeholder="Enter email"
              className="input border-2 mt-5 input-bordered input-secondary w-full max-w-xs"
            />
            {errors.email && (
              <p
                className="text-red-500 text-xl font-semibold font-mono"
                role="alert"
              >
                {errors.email?.message}
              </p>
            )}

            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password should be 6 character or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  message: "Password must be strong",
                },
              })}
              placeholder="Enter password"
              className="input border-2 mt-5 input-bordered input-secondary w-full max-w-xs"
            />
            {errors.password && (
              <p
                className="text-red-500 text-xl font-semibold font-mono"
                role="alert"
              >
                {errors.password?.message}
              </p>
            )}
            <button className="mt-5 btn btn-outline text-xl font-bold btn-secondary w-full">
              Sign Up
            </button>
            {signupError && <p className="text-red-600">{signupError}</p>}
            <div className="divider  divider-primary mt-7">OR</div>
            <button
              onClick={googleSignIn}
              className="mt-2 btn btn-outline text-xl font-bold btn-secondary w-full"
            >
              <span>
                <FaGoogle></FaGoogle>
              </span>
              Google
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
