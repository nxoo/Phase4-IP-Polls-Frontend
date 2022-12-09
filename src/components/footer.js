import React from "react";
import {useNavigate} from "react-router-dom"

function Footer() {
    const navigate = useNavigate()

    return (
        <div style={{marginTop: '75px'}}>
            <footer>
                <div className="row">
                    <div className="col-sm-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/login")}>
                                    <i className="bi-person-fill"/> Login</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/signup")}>
                                    <i className="bi bi-check2-square"/> Sign up</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/new-poll")}>
                                    <i className="bi bi-file-earmark-plus"></i> New poll</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/contact-us")}>
                                    <i className="bi bi-telephone-fill"></i> Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <h5>More</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/faq")}>
                                    <i className="bi-question-diamond"/> FAQ</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/about")}>
                                    <i className="bi bi-info-circle"/> About</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/privacy")}>
                                    <i className="bi bi-incognito"/> Privacy Policy</a></li>
                            <li className="nav-item mb-2">
                                <a href="#/" className="nav-link p-0 text-muted" onClick={() => navigate("/tos")}>
                                    <i className="bi bi-card-text"/> Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Weekly digest of what's new & exciting from us</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control"
                                       placeholder="Email address"/>
                                <button className="btn btn-secondary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2022 Opinion Polls Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3 fs-5">
                            <a className="link-dark" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi-facebook"/></a></li>
                        <li className="ms-3 fs-5">
                            <a className="link-dark" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="bi-instagram"/>
                        </a></li>
                        <li className="ms-3 fs-5">
                            <a className="link-dark" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi-twitter"/></a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
