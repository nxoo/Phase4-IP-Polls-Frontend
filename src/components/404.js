import React from "react";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="col-sm-9">
        <h2 className="mb-3">Page Not Found</h2>
        <h5 className="mb-3">404 Error</h5>
        <p>
            <a href="#/" onClick={() => navigate('/')} className="btn btn-secondary rounded-0 fw-bold">
                Go back home</a>
        </p>
        </div>
    )
}

export default NotFound;
