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

async function createUser(info) {
    let login_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/user";
    return fetch(login_url, {
        //mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
            email: info.createEmail,
            firstName: info.createFirstName,
            lastName: info.createLastName,
            address: info.createAddress,
            phone: info.createPhone,
            password: info.createPassword
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [createFirstName, setCreateFirstName] = useState();
    const [createLastName, setCreateLastName] = useState();
    const [createEmail, setCreateEmail] = useState();
    const [createAddress, setCreateAddress] = useState();
    const [createPhone, setCreatePhone] = useState();
    const [createPassword, setCreatePassword] = useState();

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

    const handleCreateUser = async event => {
        event.preventDefault()
        await createUser({
            createEmail,
            createFirstName,
            createLastName,
            createAddress,
            createPhone,
            createPassword
        });
    }

    return (
        <div>
            <h1>Log In Page</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <p>Email</p>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <br />
            <h2>Create Account</h2>
            <form onSubmit={e => handleCreateUser(e)}>
                <label>
                    Email:
                    <input type="text" onChange={e => setCreateEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    First Name:
                    <input type="text" onChange={e => setCreateFirstName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Last Name:
                    <input type="text" onChange={e => setCreateLastName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Address:
                    <input type="text" onChange={e => setCreateAddress(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Phone:
                    <input type="text" onChange={e => setCreatePhone(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" onChange={e => setCreatePassword(e.target.value)}/>
                </label>
                <br/>
                <input type="submit" value="Create an Account"/>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}