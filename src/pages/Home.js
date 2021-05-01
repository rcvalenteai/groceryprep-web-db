import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import StaticMain from "../components/StaticMain";
import NewsFeed from "../components/NewsFeed";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.setState( {color: 'red'});
        this.state =
            {
                // fname: props.fname,
                // lname: props.lname,
                // userID: props.userID
                //TODO: connect with login page props
                fname: "Richard",
                lname: "Valente",
                userID: "2"
            }
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <StaticMain props={this.state}/>
                <NewsFeed props={this.state}/>
            </div>
        )
    }
}

export default Home;
