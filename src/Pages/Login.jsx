import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // FIXED: from (not form)
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "ToyTopia | Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    loginUser(email, password)
      .then(() => {
        toast.success("Logged in Successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Failed to login");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Google login failed");
      });
  };

  const handleForgetPassword = () => {
    navigate("/forget-password", { state: { email } });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-2">
            Login to ToyTopia
          </h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            Welcome back! Please login to continue.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <label className="label justify-between">
                <button
                  type="button"
                  className="label-text-alt link link-hover text-primary"
                  onClick={handleForgetPassword}
                >
                  Forget Password?
                </button>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
            type="button"
          >
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            New to ToyTopia?{" "}
            <Link to="/register" className="link link-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
