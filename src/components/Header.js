import React from 'react';
import { Redirect, useHistory } from "react-router-dom";
import stylesheet from '../css/Header.css'

function Header() {
    const history = useHistory();

    const handleLogOut = () => {
        sessionStorage.clear()
        history.push('/')
        window.location.reload(false)
    }

    return (
        <div className='header'>
            {/* <div className='headerText'> */}
                <br/>
                <h1>Grocery Prepper</h1>
                {/* <br/> */}
            {/* </div> */}

            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Header;
