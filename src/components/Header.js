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
                {/* <br/> */}
                <button onClick={handleLogOut} className='logoutButton'>Logout</button>
                <div className='headerText'>
                <h1>Grocery Prepper</h1>
                </div>
                <br></br>
        </div>
    )
}

export default Header;
