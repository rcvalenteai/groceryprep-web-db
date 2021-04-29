import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function GroupListDisplay({group}) {
    const name = group.name;
    const creationDate = group.creation_date;
    const location = group.location;

    let joinGroup = (async () => {
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group/join";
        console.log(location)
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
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
            <div>
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
