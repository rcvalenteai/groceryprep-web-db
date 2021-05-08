import React from 'react';
import {BrowserRouter as Router, Link, useLocation} from "react-router-dom"
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeTable from "../components/RecipeList";
import RecipeDetailDisplay from "../components/RecipeDetailDisplay";
import IngredientList from "../components/IngredientList";
import OrderIngredientList from "../components/OrderIngredientList";

class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {},
            loading : true,
        };
    }

    componentDidMount() { this.fetchOrderIngredients() }

    fetchOrderIngredients = async () => {
        var get_ingredients_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/order/convert/group";
        var query = this.props.location.search;
        console.log("query")
        console.log(query)
        get_ingredients_url += query;
        var data = await fetch(get_ingredients_url)
        var ingredientData = await data.json()
        this.setState({ ingredients: ingredientData.ingredients,
            loading: false  })
    }

    render() {
        const loading = this.state.loading;
        let ingredientList;
        if (!loading) {
            ingredientList = (
                <OrderIngredientList data = { this.state.ingredients } />
            )
        } else {
            ingredientList = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Grocery List</h1>
                {ingredientList}
                <p></p>
            </div>
        )
    }
}

export default RecipeDetail;
