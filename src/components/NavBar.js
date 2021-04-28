import React from 'react';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/shop"}>Shop Now</Link>
            </div>
        )
    }

}

export default NavBar;