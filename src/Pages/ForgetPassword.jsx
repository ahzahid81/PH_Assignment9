import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase.config';

const ForgetPassword = () => {

    const location = useLocation();

    const initialEmail = location.state?.email || "";
    const [email, setEmail] = useState(initialEmail)


    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your email inbox to reset your password!");

                window.location.href = "https://mail.google.com"

            })
            .catch((error) => {
                console.log(error);

                if (error.code === "auth/user-not-found") {
                    toast.error("No user found with this email.");
                } else if (error.code === "auth/invalid-email") {
                    toast.error("Invalid email address.");
                } else {
                    toast.error("Could not send reset email.");
                }
            });


    };
    return (
        <div>
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Reset Your Password
                        </h2>
                        <p className="text-center text-sm text-gray-500 mb-4">
                            Enter your email address and we&apos;ll help you reset your password.
                        </p>

                        <form onSubmit={handleResetPassword} className="space-y-4">
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

                            {/* Reset button */}
                            <div className="form-control mt-2">
                                <button type="submit" className="btn btn-primary w-full">
                                    Reset Password
                                </button>
                            </div>
                        </form>

                        <p className="text-xs text-center text-gray-500 mt-3">
                            You will be redirected to Gmail after clicking the reset button.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;