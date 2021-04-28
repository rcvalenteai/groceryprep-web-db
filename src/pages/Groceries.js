import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";

class Groceries extends React.Component {
    constructor() {
        super();
        this.state = {color: 'green'};
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Groceries Page</h1>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default Groceries;
