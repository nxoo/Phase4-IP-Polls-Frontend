import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar";
import Polls from "./components/polls";
import NewPoll from "./components/newPoll";
import Login from "./components/login";
import Signup from "./components/signup";
import NotFound from "./components/404";
import Vote from "./components/vote";
import Results from "./components/results";
import MyPolls from "./components/my-polls";
import UsersPolls from "./components/users-polls";
import './App.css';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar/>}>
                    <Route path='/' element={<Polls/>}/>
                    <Route path='/new-poll' element={<NewPoll/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/vote' element={<Vote/>}/>
                    <Route path='/results' element={<Results/>}/>
                    <Route path='/my-polls' element={<MyPolls/>}/>
                    <Route path='/users-polls' element={<UsersPolls/>}/>
                    <Route path='*' element={<NotFound/>}/> {/* catch 404 urls */}
                </Route>
            </Routes>
        </Router>
    )
}
