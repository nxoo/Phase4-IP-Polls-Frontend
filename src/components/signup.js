import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
let message

export default function Signup() {
    const navigate = useNavigate()
    const location = useLocation()
    const host = window.location.href
    let url = 'https://aqueous-fjord-64845.herokuapp.com/signup'
    if (host.includes('localhost')) {
        url = 'http://localhost:3000/signup/'
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
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
        if (password === password2) {
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
                } else if (data.status === 201) {
                    localStorage.setItem('user', JSON.stringify(data))
                    navigate('/login', {
                        state: {
                            message: data.message
                        }
                    })
                    navigate(0)
                } else {
                    setError("Sign up failed")
                }
                setEmail('');
                setPassword('');
                setPassword2('');
            })
            .catch(e => {
                setError("Sign up failed")
            })
        } else {
            setError("Passwords do not match")
        }
    }

    return (
        <div className="col-sm-6">
            <h2 className="mb-3">Sign up</h2>
            {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            {success ? <div className="alert alert-success" role="alert">{success}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-1">
                    <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-1">
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p className="my-3">
                        Already have an account?{' '}
                        <a href="#/" className="text-decoration-none"
                           onClick={() => navigate("/login")}>login here</a>
                    </p>
                </div>
                <button type="submit" className="btn btn-success">Sign up</button>
            </form>
        </div>
    )
}
