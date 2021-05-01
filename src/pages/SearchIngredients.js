import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";



class Ingredients extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <NavBar/>
            </div>
        )
    }
}

export default Ingredients;
