import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  useEffect(() => {
    document.title = "ToyTopia | Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-8 text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Oops! Lost in ToyTopia</h2>
        <p className="text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist. Maybe the toy you
          want is hiding on another shelf.
        </p>

        {error && (
          <p className="text-xs text-gray-400">
            <span className="font-semibold">Details:</span>{" "}
            {error.statusText || error.message}
          </p>
        )}

        <div className="mt-4 flex justify-center">
          <Link to="/" className="btn btn-primary btn-sm">
            🧸 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
