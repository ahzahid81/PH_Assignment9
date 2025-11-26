import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const ExtraPrivatePage = () => {
  const { user } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);

  const [toyName, setToyName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    document.title = "ToyTopia | My Wishlist";
  }, []);

  const handleAddWishlist = (e) => {
    e.preventDefault();

    if (!toyName.trim()) return;

    const newItem = {
      id: Date.now(),
      toyName: toyName.trim(),
      note: note.trim() || "No special note added.",
    };

    setWishlist((prev) => [newItem, ...prev]);
    setToyName("");
    setNote("");
  };

  return (
    <div className="min-h-[70vh] flex flex-col gap-6">
      {/* Header / Intro */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">My Toy Wishlist</h1>
        <p className="text-sm text-gray-500">
          Plan and track toys you&apos;d love to get for your kids. This page is
          only visible to logged-in users.
        </p>

        {/* User Info */}
        <div className="mt-3 flex items-center gap-3 bg-base-100 shadow p-3 rounded-xl">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/default-avatar.png"
                }
                alt="User avatar"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">
              {user?.displayName || "Unnamed User"}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </section>

      {/* Add Wishlist Form */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-lg mb-2">
                Add a Toy to Your Wishlist
              </h2>

              <form onSubmit={handleAddWishlist} className="space-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-semibold">
                      Toy Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={toyName}
                    onChange={(e) => setToyName(e.target.value)}
                    placeholder="e.g. Remote Control Car"
                    className="input input-bordered input-sm w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-semibold">
                      Note (optional)
                    </span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="textarea textarea-bordered textarea-sm w-full"
                    placeholder="Why do you want this toy?"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-sm w-full">
                  Add to Wishlist
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Wishlist List */}
        <div className="md:col-span-2">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-lg mb-3">
                Saved Wishlist Items ({wishlist.length})
              </h2>

              {wishlist.length === 0 ? (
                <p className="text-sm text-gray-500">
                  You haven&apos;t added any toys yet. Use the form to add your
                  first wishlist item.
                </p>
              ) : (
                <div className="space-y-3">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <p className="font-semibold text-sm">
                          {item.toyName}
                        </p>
                        <span className="badge badge-primary badge-sm">
                          Wishlist
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{item.note}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraPrivatePage;
