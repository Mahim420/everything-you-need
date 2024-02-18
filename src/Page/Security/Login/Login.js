import React, { useContext, useState } from "react";
import img from "../../../Assets/image/security.png";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../Hooks/useToken";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { logIn, handleGoogleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoginError("");
    logIn(data.email, data.password)
      .then((result) => {
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.error(error.message);
        setLoginError(error.message);
      });
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        setLoginUserEmail(res?.user?.email);
        toast.success("Login successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <section
      style={{
        backgroundImage: `url(${img})`,
      }}
      className="flex w-full bg-center bg-cover h-screen justify-center items-center"
    >
      <div className="border-4 p-4 bg-black/50 border-blue-800 rounded-lg flex justify-center w-80">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h4 className="mb-5 text-white font-bold text-2xl">Login</h4>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter Your Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="input border-2 mt-5 input-bordered input-secondary w-full max-w-xs"
          />
          <label className="text-error font-semibold fonto-sans">
            Forgot Password
          </label>
          <div>
            {loginError && (
              <p className="text-red-600 font-mono">{loginError}</p>
            )}
          </div>
          <button className="mt-5 btn btn-outline text-xl font-bold btn-secondary w-full">
            Login
          </button>
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
  );
};

export default Login;
