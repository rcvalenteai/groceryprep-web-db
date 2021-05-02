import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import CreatorNavBar from "../components/CreatorNavBar";
import OrderRecipeList from "../components/OrderRecipeList";
import IngredientList from "../components/IngredientList";

class Creator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: {},
            loading: true
        };
    }

    componentDidMount() {
        //this.fetchCreator();
    }

    render() {
        const loading = this.state.loading;
        const creator = this.state.creator
        let creatorProfile;
        if (!loading) {
            if (creator) {
                creatorProfile = (
                    <div>
                        <h2>Screen Name: </h2>
                    </div>
                )
            } else {
                creatorProfile = (
                    <div>
                        <h2>You are not a creator yet!</h2>
                        <button onClick={ () => this.isClicked()}>Become a Creator</button>
                    </div>
                )
            }
        } else {
            creatorProfile = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <CreatorNavBar/>
                <h1>Creator Profile Page</h1>
                {creatorProfile}
            </div>
        )
    }
}

export default Creator;
