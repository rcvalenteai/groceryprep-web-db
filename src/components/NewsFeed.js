import React from 'react';
import {Link} from "react-router-dom";
import RecipeListDisplay from "./RecipeListDisplay"
import RecipeList from "./RecipeList";

class NewsFeed extends React.Component {

    constructor(props) {
        super(props);
        console.log("News Feed")
        console.log(props)
        this.state = {
            body: {},
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchRecipeDetail()
    }

    fetchRecipeDetail = async () => {
        var get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/feed?userUrl=";
        var query = this.props.props.userID;
        get_recipes_url += query;
        var data = await fetch(get_recipes_url)
        var recipeData = await data.json()
        console.log(recipeData)
        this.setState({
            items: recipeData.items,
            loading: false
        })
        console.log(this.state);
    }


    render() {
        console.log(this.state.items)
        const loading = this.state.loading;
        console.log(loading)
        let recipeList;
        if (!loading) {
            recipeList = (
                <RecipeList
                    data={this.state.items}
                />
            )
        } else {
            recipeList = <h1>Loading...</h1>
        }

        return (
            <div>
                <h2>News Feed</h2>
                {recipeList}
            </div>
        )
    }
}

export default NewsFeed;

// Dynamically call NewsFeed API in order to retrieve list of recipes
// Initiate component state with UserID