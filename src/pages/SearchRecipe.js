import React from 'react';
import NavBar from "../components/NavBar";

class SearchRecipe extends React.Component {
    constructor() {
        super();
        this.state = {color: 'blue'};
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>Search Recipe Page</h1>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default SearchRecipe;