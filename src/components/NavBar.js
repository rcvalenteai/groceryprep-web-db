import React from 'react';
import {Link} from "react-router-dom";
import stylesheet from '../css/NavBar.css'

class NavBar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td><Link to={"/"} className='navBarLink'>Home</Link></td>
                            <td><Link to={"/groceries"} className='navBarLink'>Groceries</Link></td>
                            <td><Link to={"/searchrecipe"} className='navBarLink'>Search</Link></td>
                            <td><Link to={"/searchingredients"} className='navBarLink'>Ingredients</Link></td>
                            <td><Link to={"/searchmealplans"} className='navBarLink'>Meal Plans</Link></td>
                            <td><Link to={"/group"} className='navBarLink'>Group</Link></td>
                            <td><Link to={"/profile"} className='navBarLink'>Profile</Link></td>
                            <td><Link to={"/creator"} className='navBarLink'>Creator</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default NavBar;