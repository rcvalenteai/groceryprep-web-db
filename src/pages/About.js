import React from 'react';
import NavBar from "../components/NavBar";

class About extends React.Component {
    constructor() {
        super();
        this.state =
            {color: 'red',
             clicked: false};
    }

    isClicked() {
        this.setState({clicked: !this.state.clicked});
        if (this.state.clicked) {
            this.setState({color: 'blue'});
        }
        else {
            this.setState( {color: 'red'});
        }

    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>My favorite color is {this.state.color}</p>
                <button onClick={ () => this.isClicked()}>Click Me</button>
            </div>
        )
    }
}

export default About;