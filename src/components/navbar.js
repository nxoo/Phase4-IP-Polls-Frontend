import React from "react";
import { useNavigate } from "react-router-dom"
import {Outlet} from "react-router-dom"
import Footer from "./footer";


function Navbar() {
    let navigate = useNavigate()

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light fs-5 mb-sm-5 mb-3 border-bottom">
                <div className="container col-sm-9">
                    <a className="navbar-brand text-secondary fw-bold" href="#/"
                       onClick={() => navigate("/")}
                    >
                        <i className="bi bi-bar-chart-line-fill"></i> Opinion Polls</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    href="#/"
                                    className="nav-link"
                                    onClick={() => navigate("/new-poll")}
                                >
                                    <i className="bi bi-file-earmark-plus"></i>{' '}
                                    New poll
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mr-0">
                                <a
                                    href="#/"
                                    className="nav-link"
                                    onClick={() => navigate("/signup")}
                                >
                                    <i className="bi bi-check2-square"></i>{' '}
                                    Sign up
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#/"
                                    className="nav-link"
                                    onClick={() => navigate("/login")}
                                >
                                    <i className="bi bi-person-fill"></i>{' '}
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container col-sm-9">
                <Outlet/>
            </div>
            <div className="container col-sm-9">
                <Footer />
            </div>
        </div>
    )
}

export default Navbar
