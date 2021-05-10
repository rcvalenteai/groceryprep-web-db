import React from 'react';
import {BrowserRouter as Router, Link, useLocation} from "react-router-dom"
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeTable from "../components/RecipeList";
import MealPlanDetailDisplay from "../components/MealPlanDetailDisplay";

class MealPlanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'green',
            body: {},
            loading : true,
        };
    }

    componentDidMount() { this.fetchmealPlanDetail() }

    fetchmealPlanDetail = async () => {
        var get_meal_plans_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/mealplan/detail";
        var query = this.props.location.search;
        get_meal_plans_url += query;
        var data = await fetch(get_meal_plans_url)
        var meal_planData = await data.json()
        this.setState({ body: meal_planData.body,
            loading: false  })
    }

    render() {
        const loading = this.state.loading;
        let mealPlanList;
        if (!loading) {
            mealPlanList = (
                <MealPlanDetailDisplay mealplan = { this.state.body } />
            )
        } else {
            mealPlanList = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>MealPlan Detail Page</h1>
                {mealPlanList}
                <p></p>
            </div>
        )
    }
}

export default MealPlanDetail;
