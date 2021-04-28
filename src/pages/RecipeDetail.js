import React from 'react';
import NavBar from "../components/NavBar";

class RecipeDetail extends React.Component {
    constructor() {
        super();
        this.state = {color: 'green'};
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>Recipe Detail Page</h1>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default RecipeDetail;