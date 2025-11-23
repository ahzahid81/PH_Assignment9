import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.form?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both email and password");
            return;
        }

        loginUser(email, password)
            .then(() => {
                toast.success("Logged in Successfully!");
                navigate(from, { replace: true })
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
    }

    const handleForgetPassword = () => {
        navigate("/forget-password", { state: { email } });
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Login to ToyTopia
                        </h2>
                        <p className="text-center text-sm text-gray-500 mb-4">
                            Welcome back! Please login to continue.
                        </p>

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
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
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

                            {/* Login button */}
                            <div className="form-control mt-2">
                                <button type="submit" className="btn btn-primary w-full">
                                    Login
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Google login */}
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full"
                            type="button"
                        >
                            Continue with Google
                        </button>

                        {/* Link to Register */}
                        <p className="text-center text-sm mt-4">
                            New to ToyTopia?{" "}
                            <Link to="/register" className="link link-primary">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;