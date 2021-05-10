import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import CreatorNavBar from "../components/CreatorNavBar";
import Dropdown from "react-dropdown";
import MealPlanRecipeCreatorList from "../components/MealPlanRecipeCreatorList";
import stylesheet from "../css/ListItemDisplay.css"

class CreatorMealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: null,
            currentMealPlan: {},
            userMealPlans: [],
            currentRecipe: {},
            userRecipes: [],
            mealPlanRecipes: [],
            newMealPlanName: "",
            newMealPlanDescription: "",
            loading: true
        };
    }

    componentDidMount() {
        this.initFetchMealPlan();
    }

    initFetchMealPlan = async () => {
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
            let get_mealplanlist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/mealplan/";
            get_mealplanlist_url += sessionState.userUrl
            let mealplanlist_data = await fetch(get_mealplanlist_url)
            let mealplanlist_data_obj = await mealplanlist_data.json()

            let get_recipelist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/recipe/";
            get_recipelist_url += sessionState.userUrl
            let recipelist_data = await fetch(get_recipelist_url)
            let recipelist_data_obj = await recipelist_data.json()
            this.setState({
                currentRecipe: recipelist_data_obj.items[0],
                userRecipes: recipelist_data_obj.items,
                creator: creator_data_obj
            })
            if (mealplanlist_data_obj.items.length > 0) {
                let get_mealplan_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/";
                get_mealplan_url += mealplanlist_data_obj.items[0].location
                let mealplan_data = await fetch(get_mealplan_url)
                let mealplan_data_obj = await mealplan_data.json()

                this.setState({
                    currentMealPlan: mealplanlist_data_obj.items[0],
                    userMealPlans: mealplanlist_data_obj.items,
                    mealPlanRecipes: mealplan_data_obj.body.recipes.items,
                    creator: creator_data_obj,
                })

            }
        }
    }

    fetchMealPlan = async () => {
        let get_mealplan_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/";
        get_mealplan_url += this.state.currentMealPlan.location
        let mealplan_data = await fetch(get_mealplan_url)
        let mealplan_data_obj = await mealplan_data.json()

        this.setState({
            mealPlanRecipes: mealplan_data_obj.body.recipes.items
        })
    }

    fetchUserMealPlans = async () => {
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let get_mealplanlist_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/mealplan/";
        get_mealplanlist_url += sessionState.userUrl
        let mealplanlist_data = await fetch(get_mealplanlist_url)
        let mealplanlist_data_obj = await mealplanlist_data.json()

        this.setState({
            userMealPlans: mealplanlist_data_obj.items,
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

    createMealPlan = async () => {
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/mealplan";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userUrl: sessionState.userUrl,
                name: this.state.newMealPlanName,
                description: this.state.newMealPlanDescription,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            }).then(() =>
            this.fetchUserMealPlans()
        )
    }

    handleAddRecipeToMealPlan(event) {
        event.preventDefault()
        this.addRecipeToMealPlan()
    }

    handleCreateMealPlan(event) {
        event.preventDefault()
        this.createMealPlan()
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
            })
    }

    mealPlanNameChangeHandler(event) {
        this.setState({
            newMealPlanName: event.target.value
        })
    }

    mealPlanDescriptionChangeHandler(event) {
        this.setState({
            newMealPlanDescription: event.target.value
        })
    }

    render() {
        const loading = this.state.loading;
        const creator = this.state.creator

        let mealPlanLabelValue;
        let mealPlans = this.state.userMealPlans;
        mealPlanLabelValue = mealPlans.map((mealPlan, index) => {
            let labelMealPlanValue = {}
            labelMealPlanValue["label"] = mealPlan.name
            labelMealPlanValue["value"] = mealPlan
            return labelMealPlanValue
        })

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
                        <h2>Create Meal Plan: </h2>
                        <form onSubmit={e => this.handleCreateMealPlan(e)}>
                            <label>
                                Name:
                                <input type="text" value={this.state.newMealPlanName}
                                       onChange={e => this.mealPlanNameChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Description:
                                <input type="text" value={this.state.newMealPlanDescription}
                                       onChange={e => this.mealPlanDescriptionChangeHandler(e)}/>
                            </label>
                            <br/>
                            <input type="submit" value="Create a Meal Plan"/>
                        </form>
                        <h2>Selected Meal Plan: {this.state.currentMealPlan.name}</h2>
                        <Dropdown options={mealPlanLabelValue} onChange={mealplan => this.handleSelectMealPlan(mealplan)}
                                  value={this.state.currentMealPlan.name}  className='dropdownItem'/>
                        <h2>Meal Plan Recipes:</h2>
                        <MealPlanRecipeCreatorList data={this.state.mealPlanRecipes}/>
                        <br />
                        <h2>Add Recipes to Meal Plan:</h2>
                        <Dropdown options={recipeLabelValue} onChange={recipe => this.handleSelectRecipe(recipe)}
                                  value={this.state.currentRecipe.name} className='dropdownItem'/>
                        <br />
                        <button onClick={e => this.handleAddRecipeToMealPlan(e)}>Add Recipe to Meal Plan</button>
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

export default CreatorMealPlan;
