import React, {useState} from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

async function fetchLogin(credientials) {
    let login_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/login";
    return fetch(login_url, {
        //mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(credientials),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async event => {
        event.preventDefault()
        const token = await fetchLogin({
            email,
            password
        });
        if(!token.hasOwnProperty('errorMessage')) {
            setToken(token)
            return <Redirect to ="/" />
        }
    }

    return (
        <div>
            <h1>Log In Page</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}