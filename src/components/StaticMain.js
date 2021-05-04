import React from 'react';
import {Link} from "react-router-dom";
import ingredientStatic from './staticingredients.png';
import logoStatic from './staticlogo.png';
import stylesheet from '../css/Home.css'

class StaticMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='staticMain'>
                <img src={logoStatic} alt={"Grocery Prepper logo"} style={{width: "80%"}}/>
                <Greeting/>
                <img src={ingredientStatic} alt={"static ingredient"} style={{width: "100%"}}/>
            </div>
        )
    }
}

const Greeting = () => {
    let sessionStorageString = window.sessionStorage.getItem('token')
    let sessionStorage = JSON.parse(sessionStorageString)

    const userIdRegex = /\d+/g
    return (
        <div>
            <p style={{textAlign: "center", margin: "5%"}}>Hello {sessionStorage.firstName} {sessionStorage.lastName}! </p>
            <p style={{textAlign: "center", margin: "5%"}}> Welcome to GroceryPrepper.
                This app enables you to quickly generate a grocery list for yourself
                and friends. Don't add ingredients one at a time, plan home cooking one RECIPE at a time!</p>
            <p style={{textAlign: "center", margin: "5%"}}>User ID: {sessionStorage.userUrl.match(userIdRegex)}</p>
        </div>
    )
}

export default StaticMain;

// Instantiate with Login Info
// Initiate component with fname and lname