import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function CreateGroup() {
    let createGroup = (async (e) => {
        e.preventDefault()
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        let userIdRegex = /\d+/g
        let userId = sessionStorage.userUrl.match(userIdRegex)[0]
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                groupName: groupName
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

    const [groupName, setGroupName] = useState()
    let handleGroupName = (e) => {
        e.preventDefault()
        setGroupName(e.target.value)
    }

    // render the UI
    return (
        <div>
            <h2>Create Group</h2>
            <form onSubmit={e => createGroup(e)}>
                <label>
                    Group Name:
                    <input type="text" value={groupName}
                           onChange={e => handleGroupName(e)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <br></br>
        </div>
    )

}

export default CreateGroup;
