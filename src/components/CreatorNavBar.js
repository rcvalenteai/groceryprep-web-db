import React from 'react';
import {Link} from "react-router-dom";
import stylesheet from '../css/NavBar.css'

class CreatorNavBar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td><Link to={"/"} className='navBarLink'>Home</Link></td>
                            <td><Link to={"/creator"} className='navBarLink'>Creator Profile</Link></td>
                            <td><Link to={"/creator/mealplan"} className='navBarLink'>Meal Plans</Link></td>
                            <td><Link to={"/creator/recipe"} className='navBarLink'>Recipes</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default CreatorNavBar;