import React from 'react';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td><Link to={"/"}>Home</Link></td>
                            <td><Link to={"/groceries"}>Groceries</Link></td>
                            <td><Link to={"/searchrecipe"}>Search</Link></td>
                            <td><Link to={"/searchingredients"}>Ingredients</Link></td>
                            <td><Link to={"/searchmealplans"}>Meal Plans</Link></td>
                            <td><Link to={"/group"}>Group</Link></td>
                            <td><Link to={"/profile"}>Profile</Link></td>
                            <td><Link to={"/creator"}>Creator</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default NavBar;