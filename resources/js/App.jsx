import { set } from "lodash";
import React, { useEffect, useState } from "react";
import {
    Link,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Teams from "./pages/Teams";
import Tournaments from "./pages/Tournaments";

export default function App() {
    const location = useLocation();

    const [isLogedin, setIsLogedin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    useEffect(() => {
        setIsLogedin(localStorage.getItem("token"));
    }, [location.pathname]);
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            localStorage.removeItem("token");
            setIsLogedin(false);
            navigate("/");
        } catch (e) {}
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col">
            <Navbar expand="md" className="rounded bg-indigo-900 text-white">
                {/* <div className="container mx-auto flex flex-wrap items-center justify-between"> */}
                <NavbarBrand>Tournament-app</NavbarBrand>
                <NavbarToggler onClick={toggle}>
                    <Bars3Icon className="h-5 w-5" />
                </NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="ms-auto">
                        <NavItem>
                            <Link
                                to="/"
                                className="block rounded py-2 pr-4 pl-3 text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </NavItem>
                        {isLogedin ? (
                            <>
                                <NavItem>
                                    <Link
                                        to="/Categories"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Categories
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link
                                        to="/Tournaments"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Tournaments
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link
                                        to="/Teams"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Teams
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    {" "}
                                    <button
                                        onClick={handleLogout}
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                    >
                                        Logout
                                    </button>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <Link
                                        to="/login"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Login
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link
                                        to="/register"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Register
                                    </Link>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
                {/* <div className="hidden w-full md:block md:w-auto">
                    <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                        <li>
                            <Link
                                to="/"
                                className="block rounded py-2 pr-4 pl-3 text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>

                        {isLogedin ? (
                            <>
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
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="block rounded py-2 pr-4 pl-3 text-white"
                                        aria-current="page"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div> */}
                {/* </div> */}
            </Navbar>
            <div className="max-2-7xl mx-6 mt-6 ">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/Categories" element={<Categories />} />
                    <Route path="/Tournaments">
                        <Route index element={<Tournaments />} />
                        <Route path=":id" element={<Tournaments />} />
                    </Route>
                    <Route path="/Teams">
                        <Route index element={<Teams />} />
                        <Route path=":id" element={<Teams />} />
                    </Route>
                    {/* <Route path="/MyProfile" element={<Teams />} /> */}
                </Routes>
            </div>
            <div className="mt-auto bg-black text-white flex justify-center">
                Algirdas Pocius 2022©
            </div>
        </div>
    );
}
