import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import StaticMain from "../components/StaticMain";
import NewsFeed from "../components/NewsFeed";


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
                <StaticMain/>
                <NewsFeed/>
            </div>
        )
    }
}

export default Home;
