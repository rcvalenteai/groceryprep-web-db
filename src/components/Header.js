import React from 'react';
import {Redirect, useHistory} from "react-router-dom";

function Header() {
    const history = useHistory();

    const handleLogOut = () => {
        sessionStorage.clear()
        history.push('/')
        window.location.reload(false)
    }

    return (
        <div>
            <h1>Grocery Prepper</h1>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Header;
