import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const { registerUser, googleLogin, updateUserProfile } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleRegister = (e) => {
        e.preventDefault();
        setPasswordError("");

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter");
            toast.error("Password must contain an uppercase letter");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter");
            toast.error("Password must contain a lowercase letter");
            return;
        };

        registerUser(email, password)
            .then(() => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success("Registration Succesful!");
                        form.reset();
                        navigate(form, { replace: true })
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.error("Profile update failed");
                    });
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Registration failed");
            });
    };

    const handleGoogleRegister = () => {
        googleLogin()
            .then(() => {
                toast.success("Signed up with Google!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message || "Google sign up failed");
            });
    }


    return (
        <div>
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Register for ToyTopia
                        </h2>
                        <p className="text-center text-sm text-gray-500 mb-4">
                            Create an account to explore toys and more!
                        </p>

                        <form onSubmit={handleRegister} className="space-y-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Enter your photo URL"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Password + show/hide */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter a strong password"
                                        className="input input-bordered w-full pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                {passwordError && (
                                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                                )}

                                <label className="label">
                                    <span className="label-text-alt text-xs text-gray-500">
                                        Must contain at least 6 characters, one uppercase and one
                                        lowercase letter.
                                    </span>
                                </label>
                            </div>

                            {/* Register button */}
                            <div className="form-control mt-2">
                                <button type="submit" className="btn btn-primary w-full">
                                    Register
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Google signup */}
                        <button
                            onClick={handleGoogleRegister}
                            className="btn btn-outline w-full"
                            type="button"
                        >
                            Continue with Google
                        </button>

                        {/* Link to Login */}
                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;