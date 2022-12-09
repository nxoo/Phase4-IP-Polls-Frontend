import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {Outlet} from "react-router-dom"
import Footer from "./footer";


function Navbar() {
    let navigate = useNavigate()
    const [user, setUser] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) setUser(data)
    }, [])

    function logout() {
        localStorage.removeItem('data');
        if (user) setUser('')
        navigate('/login', {
            state: {
                message: "Logout Success!"
            }
        })
    }

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
                            {user ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#/" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-circle"/> {user? user.user.email : 'Profile'}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a
                                                href="#/"
                                                className="dropdown-item"
                                                onClick={() => navigate("/settings")}
                                            ><i className="bi bi-gear-fill"></i>{' '} Settings</a>
                                        </li>
                                        <li>
                                            <a
                                                href="#/"
                                                className="dropdown-item"
                                                onClick={() => navigate("/settings")}
                                            ><i className="bi bi-card-list"/>{' '} My Polls</a>
                                        </li>
                                        <li>
                                            <a
                                                href="#/"
                                                className="dropdown-item"
                                                onClick={() => logout()}
                                            ><i className="bi bi-box-arrow-left"></i>{' '} Logout</a>
                                        </li>
                                    </ul>
                                </li>
                                :
                                <>
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
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container col-sm-9">
                <Outlet/>
            </div>
            <div className="container col-sm-9">
                <Footer/>
            </div>
        </div>
    )
}

export default Navbar
