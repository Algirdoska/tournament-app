import { set } from "lodash";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    const heading = "Laravel 9 Vite  with React JS"
    const location = useLocation()

    const [isLogedin, setIsLogedin] = useState(false)

    useEffect(() => {
        setIsLogedin(localStorage.getItem("token"))
    }, [location.pathname])
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            localStorage.removeItem("token")
            setIsLogedin(false)
            navigate("/")
        }
        catch (e) {


        }
    }


    return (
        <div className="bg-slate-100 min-h-screen">
            <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                <div
                    className="container mx-auto flex flex-wrap items-center justify-between"

                >
                    <a className="flex items-center">
                        Tournament-app
                    </a>
                    <div
                        className="hidden w-full md:block md:w-auto"
                    >
                        <ul
                            className="
            mt-4
            flex flex-col
            rounded-lg
            p-4
            md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium
          "
                        >
                            <li>
                                <Link
                                    to="/"
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                    aria-current="page"
                                >Home</Link>
                            </li>
                            <li>
                                <Link
                                    to="/Categories"
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                    aria-current="page"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Tournaments"
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                    aria-current="page"
                                >
                                    Tournaments
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Teams"
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                    aria-current="page"
                                >
                                    Teams
                                </Link>
                            </li>
                            {isLogedin ? (<><li>
                                <button onClick={handleLogout}
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                >
                                    Logout
                                </button>
                            </li>



                            </>) : (<><li>
                                <Link
                                    to="/login"
                                    className="block rounded py-2 pr-4 pl-3 text-white"
                                    aria-current="page"
                                >
                                    Login
                                </Link>
                            </li><li>
                                    <Link
                                        to="/register"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Register
                                    </Link>
                                </li></>)}

                        </ul>
                    </div>
                </div>
            </nav>
            <div className="max-2-7xl mx-auto mt-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}
