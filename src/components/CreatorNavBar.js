import React from 'react';
import {Link} from "react-router-dom";

class CreatorNavBar extends React.Component {
    render() {
        return (
            <div>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td><Link to={"/"}>Home</Link></td>
                            <td><Link to={"/creator"}>Creator Profile</Link></td>
                            <td><Link to={"/creator/mealplan"}>Meal Plans</Link></td>
                            <td><Link to={"/creator/recipe"}>Recipes</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default CreatorNavBar;