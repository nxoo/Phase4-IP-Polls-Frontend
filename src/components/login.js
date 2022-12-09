import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

let message

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    let host = window.location.href
    let url = 'https://aqueous-fjord-64845.herokuapp.com/login'
    if (host.includes('localhost')) {
        url = 'http://localhost:3000/login/'
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (location.state !== null) {
            message = location.state.message
            setSuccess(message)
        }
    })

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            email: email,
            password: password,
        }

            fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('r', data)
                    if (data.status === 401) {
                        setError(data.message)
                    } else if (data.status === 200) {
                        localStorage.setItem('data', JSON.stringify(data))
                        navigate('/settings', {
                            state: {
                                message: "Login Success!"
                            }
                        })
                        navigate(0)
                    } else {
                        setError("Sign up failed. Try again")
                    }
                    setEmail('');
                    setPassword('');
                })
                .catch(e => {
                    setError("Sign up failed. Try again")
                })
    }

    return (
        <div className="col-sm-6">
            <h2 className="mb-3">Login</h2>
            {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            {success ? <div className="alert alert-success" role="alert">{success}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p className="my-3">
                        Don't have an account?{' '}
                        <a href="#/" className="text-decoration-none"
                           onClick={() => navigate("/signup")}>Sign up here</a>
                    </p>
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    )
}
