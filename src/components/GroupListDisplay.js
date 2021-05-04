import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import stylesheet from '../css/GroupListDisplay.css'

function GroupListDisplay({group}) {
    const name = group.name;
    const creationDate = group.creation_date;
    const location = group.location;

    let joinGroup = (async () => {
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        let userIdRegex = /\d+/g
        let userId = sessionStorage.userUrl.match(userIdRegex)
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group/join";
        console.log(location)
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                groupUrl: location
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
                console.log(responseData)
            })
    })

    // render the UI
    if (group) {
        return (
            <div classname='listDisplayItem'>
                <h2>{name}</h2>
                <h3>Creation Date: {creationDate}</h3>
                <button onClick={e => joinGroup()}>Join Group</button>
                <br></br>
            </div>
        )
    }
        return (null);
    }


export default GroupListDisplay;
