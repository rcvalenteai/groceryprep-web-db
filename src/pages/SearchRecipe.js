import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";

class SearchRecipe extends React.Component {
    constructor() {
        super();
        this.state = {color: 'blue'};
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Search Recipe Page</h1>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default SearchRecipe;
