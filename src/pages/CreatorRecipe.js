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
            currentIngredient: {},
            userIngredients: [],
            currentRecipe: {},
            userRecipes: [],
            recipeDetail: {},
            quantity: 1.0,
            recipeName: "",
            recipeDescription: "",
            recipeCalories: null,
            recipeServings: 1,
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

        this.setState({
            loading: false
        })
        if (!creator_data_obj.hasOwnProperty('errorMessage')) {
            let get_recipelist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/recipe/";
            get_recipelist_url += sessionState.userUrl
            let recipelist_data = await fetch(get_recipelist_url)
            let recipelist_data_obj = await recipelist_data.json()

            let get_ingredientlist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/ingredients";
            let ingredientlist_data = await fetch(get_ingredientlist_url)
            let ingredientlist_data_obj = await ingredientlist_data.json()

            this.setState({
                currentIngredient: ingredientlist_data_obj.items[0],
                userIngredients: ingredientlist_data_obj.items,
                creator: creator_data_obj
            })
            if (recipelist_data_obj.items.length > 0) {
                let get_recipe_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/";
                get_recipe_url += recipelist_data_obj.items[0].location
                let recipe_data = await fetch(get_recipe_url)
                let recipe_data_obj = await recipe_data.json()

                this.setState({
                    currentRecipe: recipelist_data_obj.items[0],
                    userRecipes: recipelist_data_obj.items,
                    recipeDetail: recipe_data_obj.body,
                })
            }
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

    fetchUserRecipe = async () => {
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let get_recipelist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/recipe/";
        get_recipelist_url += sessionState.userUrl
        let recipelist_data = await fetch(get_recipelist_url)
        let recipelist_data_obj = await recipelist_data.json()

        this.setState({
            userRecipes: recipelist_data_obj.items,
        })
    }

    addIngredientToRecipe = async () => {
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/ingredients/recipe";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                ingredientUrl: this.state.currentIngredient.location,
                recipeUrl: this.state.currentRecipe.location,
                quantity: this.state.quantity
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            }).then(() =>
            this.fetchRecipe()
        )
    }

    createRecipe = async () => {
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userUrl: sessionState.userUrl,
                name: this.state.recipeName,
                description: this.state.recipeDescription,
                calories: this.state.recipeCalories,
                servings: this.state.recipeServings
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            }).then(() =>
            this.fetchUserRecipe()
        )
    }

    handleAddIngredientToRecipe(event) {
        event.preventDefault()
        this.addIngredientToRecipe()
    }

    handleCreateRecipe(event) {
        event.preventDefault()
        this.createRecipe()
    }

    handleSelectIngredient(ingredient) {
        this.setState({
                currentIngredient: ingredient.value
            }
        )
    }

    handleQuantity(quantity) {
        this.setState({
                quantity: quantity.target.value
            }
        )
    }

    handleSelectRecipe(recipe) {
        this.setState({
                currentRecipe: recipe.value
            },
            function () {
                this.fetchRecipe()
            })
    }

    recipeNameChangeHandler(event) {
        this.setState({
            recipeName: event.target.value
        })
    }

    recipeDescriptionChangeHandler(event) {
        this.setState({
            recipeDescription: event.target.value
        })
    }

    recipeCaloriesChangeHandler(event) {
        this.setState({
            recipeCalories: event.target.value
        })
    }

    recipeServingsChangeHandler(event) {
        this.setState({
            recipeServings: event.target.value
        })
    }

    render() {
        const loading = this.state.loading;
        const creator = this.state.creator

        let ingredientLabelValue;
        let ingredients = this.state.userIngredients;
        let dropDownValue = null
        if (this.state.currentIngredient)
            dropDownValue = this.state.currentIngredient.iname + " - " + this.state.currentIngredient.quantity + " " + this.state.currentIngredient.unit
        ingredientLabelValue = ingredients.map((ingredient, index) => {
            let labelIngredientValue = {}
            labelIngredientValue["label"] = ingredient.iname + " - " + ingredient.quantity + " " + ingredient.unit
            labelIngredientValue["value"] = ingredient
            return labelIngredientValue
        })

        let recipeLabelValue;
        let Recipes = this.state.userRecipes;
        recipeLabelValue = Recipes.map((Recipe, index) => {
            let labelRecipeValue = {}
            labelRecipeValue["label"] = Recipe.name
            labelRecipeValue["value"] = Recipe
            return labelRecipeValue
        })

        let recipeDetail;
        if (Object.keys(this.state.recipeDetail).length === 0) {
            recipeDetail = <br />
        } else {
            recipeDetail = <RecipeDetailDisplay recipe={this.state.recipeDetail}/>
        }

        let creatorRecipeList;
        if (!loading) {
            if (creator) {
                creatorRecipeList = (
                    <div>
                        <h2>Create Recipe:</h2>
                        <form onSubmit={e => this.handleCreateRecipe(e)}>
                            <label>
                                Name:
                                <input type="text" value={this.state.recipeName}
                                       onChange={e => this.recipeNameChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Description:
                                <input type="text" value={this.state.recipeDescription}
                                       onChange={e => this.recipeDescriptionChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Calories:
                                <input type="number" min="0" step="1" value={this.state.recipeCalories}
                                       onChange={e => this.recipeCaloriesChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Servings:
                                <input type="number" min="0" step="1" value={this.state.recipeServings}
                                       onChange={e => this.recipeServingsChangeHandler(e)}/>
                            </label>
                            <br/>
                            <input type="submit" value="Create a Recipe"/>
                        </form>
                        <h2>Selected Recipe: {this.state.currentRecipe.name}</h2>
                        <Dropdown options={recipeLabelValue} onChange={recipe => this.handleSelectRecipe(recipe)}
                                  value={this.state.currentRecipe.name}/>
                        {recipeDetail}
                        <h2>Add Ingredients to Recipe:</h2>
                        <Dropdown options={ingredientLabelValue}
                                  onChange={ingredient => this.handleSelectIngredient(ingredient)}
                                  value={dropDownValue}/>
                        <br/>
                        <form onSubmit={e => this.handleAddIngredientToRecipe(e)}>
                            <label>
                                Quantity To Add:
                                <input type="number" min="0.01" step="0.001" value={this.state.quantity}
                                       onChange={e => this.handleQuantity(e)}/>
                            </label>
                            <input type="submit" value="Add Ingredient to Recipe"/>
                        </form>
                    </div>
                )
            } else {
                creatorRecipeList = (
                    <div>
                        <h2>You are not a creator yet! Go Become One First!</h2>
                    </div>
                )
            }
        } else {
            creatorRecipeList = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <CreatorNavBar/>
                <h1>Creator Recipe Page</h1>
                {creatorRecipeList}
            </div>
        )
    }
}

export default CreatorRecipe;
