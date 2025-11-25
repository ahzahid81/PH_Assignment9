import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';

const MyProfile = () => {

    const { user, updateUserProfile } = useContext(AuthContext);

    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!name || !photoURL) {
            toast.error("Name and Photo URL cannot be empty");
            return;
        }

        updateUserProfile(name, photoURL)
            .then(() => {
                toast.success("Profile updated succesfully!")
            })
            .catch(() => {
                toast.error("Failed to update profile");
            })
    }

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        My Profile
                    </h2>

                    {/* User Info Display */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co/4pDNDk1/default-avatar.png"
                                    }
                                    alt="User avatar"
                                />
                            </div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">
                            {user?.displayName || "No Name"}
                        </h3>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>

                    {/* Update Profile Form */}
                    <form onSubmit={handleUpdate} className="space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Update Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Update Photo URL</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                required
                            />
                        </div>

                        {/* Save Changes */}
                        <div className="form-control mt-2">
                            <button type="submit" className="btn btn-primary w-full">
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-xs text-gray-500 mt-3">
                        Your updates will appear instantly across the site.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;