import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";

class Profile extends React.Component {
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
                <Header/>
                <NavBar/>
                <h1>Profile Page</h1>
                <p>My favorite color is {this.state.color}</p>
                <button onClick={ () => this.isClicked()}>Click Me</button>
            </div>
        )
    }
}

export default Profile;
