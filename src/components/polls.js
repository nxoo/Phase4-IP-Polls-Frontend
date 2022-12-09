import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
    <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
    </ContentLoader>
);

function Polls() {
    let navigate = useNavigate()
    let host = window.location.href
    let url = 'https://nxoo-json-server.herokuapp.com/questions'
    if (host.includes('localhost')) {
        url = 'http://localhost:3000/questions'
    }
    let [polls, setPolls] = useState([])
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState()
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(data => {
                console.log('dddd', data)
                if (data.length === 0) {
                    setError('There are no polls')
                    setLoading(false)
                } else if (data.questions) {
                    setPolls(data)
                    setLoading(false)
                }
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [])


    /*
    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error fetching polls! Try again later.
            </div>
        )
    }
     */

    console.log(polls)
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
                    <h4>No polls</h4> :
                    <div>
                        <h4 className="mb-3">Latest polls</h4>
                        <div className="table-responsive">
                            <table className="table table-striped text-nowrap">
                                <tbody className="">
                                {[].map(poll => (
                                    <tr className="py-5" key={poll.id}>
                                        <td className="px-sm-5">{poll.id}</td>
                                        <td className="fw-bold text-secondary">{poll.poll}</td>
                                        <td className="">
                                            <button
                                                className="btn btn-success btn-sm text-white mx-2"
                                                onClick={() => navigate('/vote', {
                                                    state: {pollId: poll.id}
                                                })}>Vote
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary btn-sm mx-2"
                                                onClick={() => navigate('/results', {
                                                    state: {pollId: poll.id}
                                                })}>Results
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </>
    )
}

export default Polls;