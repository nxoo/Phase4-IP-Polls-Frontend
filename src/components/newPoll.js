import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function NewPoll() {
    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState([{choice: '', votes: 0}, {choice: '', votes: 0}])
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const host = window.location.href
    let url = 'https://aqueous-fjord-64845.herokuapp.com/'
    if (host.includes('localhost')) {
        url = 'http://localhost:3000/'
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            setUser(data)
        } else {
            setError("You need to login")
        }
    }, [])

    function handleChange(e, index) {
        const updatedChoice = {...choices[index], choice: e.target.value}
        const updatedChoices = [
            ...choices.slice(0, index),
            updatedChoice,
            ...choices.slice(index + 1)
        ]
        setChoices(updatedChoices)
    }

    function addChoice(e) {
        e.preventDefault()
        //let id = choices.length+1
        setChoices(choices => [...choices, {choice: '', votes: 0}])
    }

    function removeChoice(e, index) {
        e.preventDefault()
        let newState = [...choices]
        newState.splice(index, 1)
        setChoices(newState)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            user_id: user.user.id,
            question: question,
        }
        fetch(url + 'questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                for (const choice in choices) {
                    fetch(url + 'choices', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({
                            question_id: data.id,
                            choice: choices[choice]["choice"],
                            votes: choices[choice]["votes"]
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            navigate('/vote', {
                                state: {
                                    pollId: data.question_id,
                                    message: "Poll Created Successfully"
                                }
                            })
                        })
                }
            })
            .catch(e => {
                console.log('error', e)
                setError("Poll not created")
            })
    }

    return (
        <div className="col-sm-6">
            <h4 className="mb-3">Create a new poll</h4>
            {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-1">
                        <input
                            type="text"
                            className="form-control"
                            id={`${index}`}
                            placeholder={`Choice ${index + 1}`}
                            value={choice.choice}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        {index < 2 ? null :
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={(e) => removeChoice(e, index)}
                            >x</button>}
                    </div>
                ))}
                <div className="mb-2">
                    <button className="btn btn-link text-decoration-none ps-0"
                            onClick={(e) => addChoice(e)}>Add choice <i className="bi bi-file-plus"/>
                    </button>
                </div>
                <button type="submit" className="btn btn-success" disabled={user === ''}>
                    Submit
                </button>
            </form>
        </div>
    )
}
