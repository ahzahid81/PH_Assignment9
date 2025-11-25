import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOutUser, loading } = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser().catch(console.error);
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-profile"
                    className={({ isActive }) =>
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    My Profile
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/extra"
                    className={({ isActive }) =>
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    Extra
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow">
            <div className="navbar-start">
                {/* mobile menu */}
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10m-7 6h7" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
                    >
                        {navLinks}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <span className="font-bold text-primary">ToyTopia</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            <div className="navbar-end gap-3">
                {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                )}

                {!loading && user && (
                    <>
                        <div
                            className="tooltip tooltip-bottom"
                            data-tip={user.displayName || user.email || "User"}
                        >
                            <div className="avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://i.ibb.co/4pDNDk1/default-avatar.png"
                                        }
                                        alt="User avatar"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-outline btn-primary"
                        >
                            Logout
                        </button>
                    </>
                )}

                {!loading && !user && (
                    <Link to="/login" className="btn btn-sm btn-primary">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
