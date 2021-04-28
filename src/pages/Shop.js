import React from 'react';
import NavBar from "../components/NavBar";

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {color: 'blue'};
    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default Shop;