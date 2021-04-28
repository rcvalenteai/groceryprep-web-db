import React from 'react';
import {Link} from "react-router-dom";
import ingredientStatic from './staticingredients.png';
import logoStatic from './staticlogo.png';

class StaticMain extends React.Component {
    constructor(props) {
        super();
        this.state =
            {
                color: 'green'
            }
    }
    render() {
        return (
            <div>
                <img src={logoStatic} alt={"Grocery Prepper logo"} style={{width: "80%"}}/>
                <p>Color is {this.state.color}</p>
                <img src={ingredientStatic} alt={"static ingredient"} style={{width: "100%"}} />
            </div>
        )

    }

}

export default StaticMain;