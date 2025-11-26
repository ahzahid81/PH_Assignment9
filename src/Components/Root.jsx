import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Root = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar/>
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>
            <Footer></Footer>
            <Toaster position="top-center"></Toaster>
        </div>
    );
};

export default Root;
