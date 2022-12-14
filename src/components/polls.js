import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ContentLoader from "react-content-loader";
import {formatRelative, formatDistance, parseISO} from "date-fns";
import "../components/styles/polls.css"

let message

const MyLoader = () => (
    <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
    </ContentLoader>
);

function Polls() {
    const navigate = useNavigate()
    const location = useLocation()
    const host = window.location.href
    let url = 'https://aqueous-fjord-64845.herokuapp.com/'
    if (host.includes('localhost')) {
        url = 'http://localhost:3000/'
    }
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (location.state !== null) {
            message = location.state.message
            setSuccess(message)
        }
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            setUser(data)
        }
        fetch(url + 'questions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data === null ? user.token : data.token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                fetch(url + 'users', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setUsers(data)
                    })
                if (data) {
                    setPolls(data)
                    setLoading(false)
                }
            })
            .catch(error => {
                setError(error.message || error)
                setLoading(false)
            })
    }, [])

    function fetchPollOwner(pollId) {
        let user = users.find(x => x.id === pollId)
        if (user) {
            return user.email
        }
    }

    function MyPolls(poll) {
        if (!user) {
            navigate("users-polls", {
                state: {
                    userId: poll.user_id
                }
            })
        } else if (user.user.id === poll.user_id) {
            navigate("my-polls")
        } else {
            navigate("users-polls", {
                state: {
                    userId: poll.user_id
                }
            })
        }
    }

    return (
        loading ?
            <>
                <h4>Fetching polls</h4>
                <svg width="100%" height="100%">
                    <MyLoader/>
                </svg>
            </>
            :
            <>
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
                {success ? <div className="alert alert-success" role="alert">{success}</div> : null}
                <div>
                    <p className="fs-5">{polls.length===0 ?
                        <div className="alert alert-warning" role="alert">There are no polls</div>
                        :'Latest polls'}</p>
                    <div className="">
                        {polls.map(poll => (
                            <div className="" key={poll.id}>
                                <div>
                                    By <span className="" id="pollOwner"
                                             onClick={() => MyPolls(poll)}>
                                                {fetchPollOwner(poll.user_id)}
                                    </span> <i className="bi bi-arrow-up-right"/>
                                </div>
                                <div className="py-3 border-bottom mb-2" id="poll"
                                     key={poll.id}
                                     onClick={() => navigate('/vote', {
                                         state: {pollId: poll.id}
                                     })}>
                                    <div className="fw-bold text-secondary">
                                        <h3 className="">{poll.question}</h3>
                                        <div className="mb-2">
                                            {formatRelative(parseISO(poll.created_at), new Date())}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
    )
}

export default Polls;
