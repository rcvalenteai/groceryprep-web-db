import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import StaticMain from "../components/StaticMain";


class Home extends React.Component {
    constructor(props) {
        super();
        this.state =
            {
                color: 'green',
                userID: '1'
            };
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <StaticMain/>
                <p>My favorite color is {this.state.color}</p>
            </div>
        )
    }
}

export default Home;
