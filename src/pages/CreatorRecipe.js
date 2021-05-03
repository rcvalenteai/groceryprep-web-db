import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import CreatorNavBar from "../components/CreatorNavBar";
import Dropdown from "react-dropdown";
import MealPlanRecipeList from "../components/MealPlanRecipeList";
import RecipeDetailDisplay from "../components/RecipeDetailDisplay";

class CreatorRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: null,
            currentMealPlan: null,
            userMealPlans: [],
            currentRecipe: null,
            userRecipes: [],
            recipeDetail: null,
            loading: true
        };
    }

    componentDidMount() {
        this.initFetchRecipe();
    }

    initFetchRecipe = async () => {
        // Get session data
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let get_creator_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/profile/";
        get_creator_url += sessionState.userUrl
        let creator_data = await fetch(get_creator_url)
        let creator_data_obj = await creator_data.json()

        if (!creator_data_obj.hasOwnProperty('errorMessage')) {
            let get_recipelist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/recipe/";
            get_recipelist_url += sessionState.userUrl
            let recipelist_data = await fetch(get_recipelist_url)
            let recipelist_data_obj = await recipelist_data.json()

            let get_recipe_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/";
            get_recipe_url += recipelist_data_obj.items[0].location
            let recipe_data = await fetch(get_recipe_url)
            let recipe_data_obj = await recipe_data.json()

            // let get_recipelist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/recipe/";
            // get_recipelist_url += sessionState.userUrl
            // let recipelist_data = await fetch(get_recipelist_url)
            // let recipelist_data_obj = await recipelist_data.json()

            this.setState({
                // currentMealPlan: mealplanlist_data_obj.items[0],
                // userMealPlans: mealplanlist_data_obj.items,
                currentRecipe: recipelist_data_obj.items[0],
                userRecipes: recipelist_data_obj.items,
                recipeDetail: recipe_data_obj.body,
                creator: creator_data_obj,
                loading: false
            })
        }
    }

    fetchRecipe = async () => {
        let get_recipe_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/";
        get_recipe_url += this.state.currentRecipe.location
        let recipe_data = await fetch(get_recipe_url)
        let recipe_data_obj = await recipe_data.json()

        this.setState({
            recipeDetail: recipe_data_obj.body
        })
    }

    addRecipeToMealPlan = async () => {
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/mealplan/recipe";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                mealPlanUrl: this.state.currentMealPlan.location,
                recipeUrl: this.state.currentRecipe.location
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            }).then(() =>
            this.fetchMealPlan()
        )
    }

    handleAddRecipeToMealPlan(event) {
        event.preventDefault()
        this.addRecipeToMealPlan()
    }

    handleSelectMealPlan(mealplan) {
        this.setState({
                currentMealPlan: mealplan.value
            },
            function () {
                this.fetchMealPlan()
            })
    }

    handleSelectRecipe(recipe) {
        this.setState({
            currentRecipe: recipe.value
        },
            function () {
            this.fetchRecipe()
        })
    }

    render() {
        const loading = this.state.loading;
        const creator = this.state.creator

        // let mealPlanLabelValue;
        // let mealPlans = this.state.userMealPlans;
        // mealPlanLabelValue = mealPlans.map((mealPlan, index) => {
        //     let labelMealPlanValue = {}
        //     labelMealPlanValue["label"] = mealPlan.name
        //     labelMealPlanValue["value"] = mealPlan
        //     return labelMealPlanValue
        // })

        let recipeLabelValue;
        let Recipes = this.state.userRecipes;
        recipeLabelValue = Recipes.map((Recipe, index) => {
            let labelRecipeValue = {}
            labelRecipeValue["label"] = Recipe.name
            labelRecipeValue["value"] = Recipe
            return labelRecipeValue
        })

        let creatorMealPlanList;
        if (!loading) {
            if (creator) {
                creatorMealPlanList = (
                    <div>
                        <h2>Selected Recipe: {this.state.currentRecipe.name}</h2>
                        <Dropdown options={recipeLabelValue} onChange={recipe => this.handleSelectRecipe(recipe)}
                                  value={this.state.currentRecipe.name}/>
                        <RecipeDetailDisplay recipe={this.state.recipeDetail}/>
                        <br />
                        <h2>TODO: Add Ingredients to Recipe:</h2>
                        {/*<Dropdown options={mealPlanLabelValue} onChange={mealplan => this.handleSelectMealPlan(mealplan)}*/}
                        {/*          value={this.state.currentMealPlan.name}/>*/}
                        <br />
                        <button onClick={e => this.handleAddRecipeToMealPlan(e)}>Add Ingredient to Recipe</button>
                    </div>
                )
            } else {
                creatorMealPlanList = (
                    <div>
                        <h2>You are not a creator yet! Go Become One First!</h2>
                    </div>
                )
            }
        } else {
            creatorMealPlanList = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <CreatorNavBar/>
                <h1>Creator Meal Plan Page</h1>
                {creatorMealPlanList}
            </div>
        )
    }
}

export default CreatorRecipe;
