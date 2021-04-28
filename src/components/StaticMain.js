import React from 'react';
import {Link} from "react-router-dom";
import ingredientStatic from './staticingredients.svg';

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
                <p>Color is {this.state.color}</p>
                <img src={ingredientStatic} alt={"static ingredient image"}/>
                <ingredientStatic/>
            </div>
        )

    }

}

export default StaticMain;