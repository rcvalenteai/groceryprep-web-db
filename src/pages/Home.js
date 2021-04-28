import React from 'react';
import NavBar from "../components/NavBar";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {color: 'green'};
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

export default Home;