import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function NewPoll() {
    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState([{id: 1, choice: '', votes: 0}, {id: 2, choice: '', votes: 0}])
    const navigate = useNavigate()
    let host = window.location.href
    let url = 'https://nxoo-json-server.herokuapp.com/polls'
    if (host.includes('localhost')) {
        //url = 'http://localhost:8000/polls'
        url = 'https://nxoo-json-server.herokuapp.com/'
    }

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
        let id = choices.length+1
        setChoices(choices => [...choices, {id: id, choice: '', votes: 0}])
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
            poll: question,
            choices: choices,
            comments: [],
        }
        console.log('poll', data)
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => navigate('/vote', {
                state: {
                    pollId: data.id
                }
            }))
    }

    return (
        <div className="col-sm-6">
            <h4 className="mb-3">Create a new poll</h4>
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
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}
