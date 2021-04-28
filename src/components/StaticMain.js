import React from 'react';
import {Link} from "react-router-dom";
import ingredientStatic from './staticingredients.png';
import logoStatic from './staticlogo.png';

class StaticMain extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                fname: props.fname,
                lname: props.lname,
                userID: props.userID
            }
    }
    render() {
        // const userInfo = {
        //     fname: "Rich",
        //     lname: "Valente",
        //     userID: "1"
        // };
        return (
            <div>
                <img src={logoStatic} alt={"Grocery Prepper logo"} style={{width: "80%"}}/>
                <Greeting userInfo={this.state}/>
                <img src={ingredientStatic} alt={"static ingredient"} style={{width: "100%"}} />
            </div>
        )

    }

}

const Greeting = ({userInfo}) => (
    <div>
        <p style={{textAlign: "center", margin: "5%"}}>Hello {userInfo.fname} {userInfo.lname}, welcome to GroceryPrepper. This app enables you to quickly generate a grocery list for yourself
            and friends. Don't add ingredients one at a time, plan home cooking one RECIPE at a time!</p>
    </div>
)

export default StaticMain;

// Instantiate with Login Info
// Initiate component with fname and lname