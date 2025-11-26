import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';

const ToyDetails = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [toy, setToy] = useState(null);
    const [loadingToy, setLoadingToy] = useState(true);


    useEffect(() => {
        const fecthToy = async () => {
            try {
                const res = await fetch("/toy.json");
                const data = await res.json();


                const foundToy = data.find((item) => String(item.toyId) === String(id));

                setToy(foundToy || null);
            } catch (error) {
                console.error("Error loading toy data", error)
            } finally {
                setLoadingToy(false);
            }
        }

        fecthToy();
    }, [id])


    const handleTryNow = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        if (!name || !email) {
            toast.error("Please provide both name and email");
            return;
        }

        toast.success("Your request to try this toy has been submitted");
        form.reset();
    }

    if (loadingToy) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!toy) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl font-bold">Toy not found</h2>
                <Link to="/" className="btn btn-primary">
                    Go Back Home
                </Link>
            </div>
        );
    }
    return (
        <div>
            <div className="grid gap-8 md:grid-cols-2 items-start">
                {/* Toy Info */}
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-6 pt-6">
                        <img
                            src={toy.pictureURL}
                            alt={toy.toyName}
                            className="rounded-xl max-h-72 object-cover w-full"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold">
                            {toy.toyName}
                            <div className="badge badge-secondary">{toy.subCategory}</div>
                        </h2>

                        <p className="text-sm text-gray-600 mb-2">
                            {toy.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p>
                                    <span className="font-semibold">Seller:</span>{" "}
                                    {toy.sellerName}
                                </p>
                                <p>
                                    <span className="font-semibold">Email:</span>{" "}
                                    {toy.sellerEmail}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-semibold">Price:</span> ${toy.price}
                                </p>
                                <p>
                                    <span className="font-semibold">Rating:</span> ⭐{toy.rating}
                                </p>
                                <p>
                                    <span className="font-semibold">Available:</span>{" "}
                                    {toy.availableQuantity}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Try Now Form */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="text-xl font-bold mb-2">
                            Try Now: {toy.toyName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Fill in your details and we&apos;ll contact you with more info
                            about trying this toy for your kid.
                        </p>

                        <form onSubmit={handleTryNow} className="space-y-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user?.displayName || ""}
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
                                    defaultValue={user?.email || ""}
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control mt-2">
                                <button type="submit" className="btn btn-primary w-full">
                                    Try Now
                                </button>
                            </div>
                        </form>

                        <p className="text-xs text-gray-500 mt-3">
                            This form is for demonstration only. Your data is not stored in any
                            database.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToyDetails;