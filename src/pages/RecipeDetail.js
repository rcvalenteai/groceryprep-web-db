import React from 'react';
import {BrowserRouter as Router, Link, useLocation} from "react-router-dom"
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeTable from "../components/RecipeList";
import RecipeDetailDisplay from "../components/RecipeDetailDisplay";

class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'green',
            body: {},
            loading : true,
        };
    }

    componentDidMount() { this.fetchRecipeDetail() }

    fetchRecipeDetail = async () => {
        var get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes/detail";
        var query = this.props.location.search;
        get_recipes_url += query;
        var data = await fetch(get_recipes_url)
        var recipeData = await data.json()
        console.log(recipeData)
        this.setState({ body: recipeData.body,
            loading: false  })
    }

    render() {
        const loading = this.state.loading;
        let recipeList;
        if (!loading) {
            console.log(this.state.body)
            recipeList = (
                <RecipeDetailDisplay recipe = { this.state.body } />
            )
        } else {
            recipeList = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Recipe Detail Page</h1>
                {recipeList}
                <p></p>
            </div>
        )
    }
}

export default RecipeDetail;
