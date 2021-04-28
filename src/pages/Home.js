import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {color: 'green'};
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default Home;
