import React from 'react';
import NavBar from "../components/NavBar";

class Groceries extends React.Component {
    constructor() {
        super();
        this.state = {color: 'green'};
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>Groceries Page</h1>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default Groceries;