import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ContentLoader from "react-content-loader";

let pollId, url;

const MyLoader = () => (
    <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
    </ContentLoader>
);

export default function Vote() {
    const location = useLocation()
    const navigate = useNavigate()
    const [poll, setPoll] = useState()
    const [user, setUser] = useState('')
    const [error, setError] = useState()
    const [choiceId, setChoiceId] = useState()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (location.state === null) {
            navigate("/")
            return
        } else {
            let host = window.location.href
            pollId = location.state.pollId
            setSuccess(location.state.message)
            url = 'https://aqueous-fjord-64845.herokuapp.com/'
            if (host.includes('localhost')) {
                url = 'http://localhost:3000/'
            }
        }
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            setUser(data)
        } else {
            setError("You need to login")
        }
        fetch(url + 'questions/' + pollId)
            .then(res => res.json())
            .then(data => {
                setPoll(data)
                setLoading(false)
            })
            .catch(error => setError(error))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let filteredChoice = poll.choices.find(x => x.id === parseInt(choiceId));
        let newChoice = {question_id: pollId, votes: filteredChoice.votes + 1}
        fetch(url + 'choices/' + choiceId, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newChoice)
        }).then(res => res.json())
            .then(data => navigate('/results', {
                state: {
                    pollId: data.question_id,
                    choice: data.choice
                }
            }))
    }

    return (
        loading ?
            <>
                <h4>Fetching poll</h4>
                <svg width="100%" height="100%">
                    <MyLoader/>
                </svg>
            </>
            :
            <div>
                <h4 className="mb-3">{poll.question}</h4>
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
                {success ? <div className="alert alert-success" role="alert">{success}</div> : null}
                <form onSubmit={(e) => handleSubmit(e)}>
                    {poll.choices.map(choice => (
                        <div className="form-check" key={choice.id}>
                            <input className="form-check-input" type="radio" name="choice1"
                                   onChange={e => setChoiceId(e.target.id)}
                                   id={choice.id} required/>
                            <label className="form-check-label" htmlFor={choice.id}>
                                {choice.choice}
                            </label>
                        </div>
                    ))}
                    <input className="btn btn-success mt-3" disabled={user===''} type="submit" value="Vote"/>
                </form>
                <div>
                    <button className="btn btn-outline-secondary text-decoration-none mt-3"
                            onClick={() => navigate("/results", {
                                state: {pollId: poll.id}
                            })}>See Results
                    </button>
                </div>
            </div>
    )
}
