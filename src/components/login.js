import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
let message

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const url = 'http://localhost:8000/users'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState('')

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
                if (data === null) {
                    setError("Sign up failed. Try again")
                } else if (data.id) {
                    localStorage.setItem('user', JSON.stringify(data))
                    navigate('/profile', {
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
