import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ContentLoader from "react-content-loader";
import {formatRelative, formatDistance, parseISO} from "date-fns";
import "../components/styles/polls.css"

let userId

const MyLoader = () => (
    <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
    </ContentLoader>
);

function UsersPolls() {
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
            userId = location.state.userId
        }
        const account = JSON.parse(localStorage.getItem('data'));
        if (account) {
            setUser(account)
        }
        fetch(url + 'users/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setPolls(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message || error)
                setLoading(false)
            })
        setLoading(false)
    }, [])


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
                {polls.length === 0 ?
                    <div className="alert alert-warning" role="alert">Your polls will appear here</div>
                    :
                    <div>
                        <p className="fs-5"><b className="text-info">{polls.email}</b> latest polls</p>
                        <div className="">
                            {polls.questions.map(poll => (
                                <div key={poll.id}>
                                    <div className="py-3 border-bottom mb-2" id="poll"
                                         key={poll.id}
                                         onClick={() => navigate('/vote', {
                                             state: {pollId: poll.id}
                                         })}>
                                        <div className="fw-bold text-secondary">
                                            <h3 className="">{poll.question}</h3>
                                            <div className="mt-2">
                                                {formatRelative(parseISO(poll.created_at), new Date())}{' '}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </>
    )
}

export default UsersPolls;
