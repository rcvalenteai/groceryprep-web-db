import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import qs from "querystring";
import RecipeList from "../components/RecipeList";
import Dropdown from "react-dropdown";
import MultiSelect from "react-multi-select-component";
import OrderRecipeList from "../components/OrderRecipeList";
import IngredientList from "../components/IngredientList";

class Groceries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeCount: 0,
            recipes: [],
            ingredientCount: 0,
            ingredients: [],
            currentGroup: {},
            userGroups: [],
            openOrder: false,
            orderCost: 0.0,
            costPerPerson: 0.0,
            loading: true,
        }
    }

    componentDidMount() {
        this.initFetchGroupOrder();
    }

    initFetchGroupOrder = async () => {
        let get_user_groups_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/user/groups";
        let user = "?userId=1"
        get_user_groups_url += user
        let group_data = await fetch(get_user_groups_url)
        let user_group_data = await group_data.json()
        let group_url = user_group_data.items[0].location
        console.log(group_url)
        let get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/order/";
        get_recipes_url += group_url
        console.log(get_recipes_url)
        let data = await fetch(get_recipes_url)
        let orderData = await data.json()
        let split_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/split-order/";
        split_url += group_url
        split_url += "&cost=0"
        console.log(split_url)
        let split_data = await fetch(split_url)
        let splitData = await split_data.json()
        this.setState({
            currentGroup: user_group_data.items[0],
            userGroups: user_group_data.items,
            ingredients: orderData.ingredients,
            ingredientCount: orderData.ingredient_count,
            recipes: orderData.recipes,
            recipeCount: orderData.recipe_count,
            loading: false
        })
        if (!orderData.hasOwnProperty('errorMessage')) {
            this.setState({
                openOrder: true
            })
        } else {
            this.setState({
                openOrder: false
            })
        }

    }

    fetchGroupOrder = async () => {
        let group_url = this.state.currentGroup.location
        console.log(group_url)
        let get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/order/";
        get_recipes_url += group_url
        console.log(get_recipes_url)
        let data = await fetch(get_recipes_url)
        let orderData = await data.json()
        if (!orderData.hasOwnProperty('errorMessage')) {
            let split_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/split-order/";
            split_url += group_url
            split_url += "&cost=" + orderData.totalCost
            console.log(split_url)
            console.log(orderData)
            let split_data = await fetch(split_url)
            let splitData = await split_data.json()
            this.setState({
                openOrder: true,
                ingredients: orderData.ingredients,
                ingredientCount: orderData.ingredient_count,
                recipes: orderData.recipes,
                recipeCount: orderData.recipe_count,
                orderCost: orderData.totalCost,
                costPerPerson: splitData.costPer
            })
        } else {
            this.setState({
                openOrder: false
            })
        }
    }

    fetchSplitOrder = async () => {
        let group_url = this.state.currentGroup.location
        let cost = this.state.orderCost
        let split_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/split-order/";
        split_url += group_url
        split_url += "&cost=" + cost
        let split_data = await fetch(split_url)
        let splitData = await split_data.json()
        this.setState({
            costPerPerson: splitData.costPer
        })
    }

    handleSplit(event) {
        event.preventDefault()
        console.log("Split Cost")
        this.fetchSplitOrder()
    }

    orderChangeHandler(event) {
        console.log(event.target.value)
        this.setState({
            orderCost: event.target.value
        })
    }

    handleSelectGroup(group) {
        console.log("Select Group")
        console.log(group)
        this.setState({
                currentGroup: group.value
            },
            function () {
                this.fetchGroupOrder()
            })
    }

    handleOpenOrder(event) {
        event.preventDefault()
        console.log("Open Order")
    }

    render() {
        console.log(this.state.items)
        const loading = this.state.loading;
        console.log(loading)
        const recipeCount = this.state.recipeCount
        const ingredientCount = this.state.ingredientCount
        let recipeList;
        let ingredientList;
        if (!loading) {
            if (recipeCount > 0) {
                recipeList = (
                    <div>
                        <h2>Recipes: </h2>
                        <OrderRecipeList
                            data={this.state.recipes}
                        />
                    </div>
                )
            } else {
                recipeList = null
            }
            if (ingredientCount > 0) {
                ingredientList = (
                    <div>
                        <h2>Ingredients: </h2>
                        <IngredientList
                            data={this.state.ingredients}
                        />
                    </div>
                )
            } else {
                ingredientList = null
            }
        } else {
            recipeList = <h1>Loading...</h1>
            ingredientList = null
        }

        let groupLabelValue;
        let groups = this.state.userGroups;
        groupLabelValue = groups.map(group => {
            let labelGroupValue = {}
            labelGroupValue["label"] = group.name
            labelGroupValue["value"] = group
            return labelGroupValue
        })

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        let costPerPerson = formatter.format(this.state.costPerPerson)

        let orderDisplay;
        const openOrder = this.state.openOrder
        if (openOrder) {
            orderDisplay = (
                <div>
                    <form onSubmit={e => this.handleSplit(e)}>
                        <label>
                            Calculate Order Cost:
                            <input type="number" min="0.01" step="0.01" value={this.state.orderCost}
                                   onChange={e => this.orderChangeHandler(e)}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                    <h2>Cost Per Person: {costPerPerson}</h2>
                    {recipeList}
                    {ingredientList}
                </div>
            )
        } else {
            orderDisplay = (
                <div>
                    <h2>Open an Order!</h2>
                    <button onClick={e => this.handleOpenOrder(e)}>Open</button>
                </div>
            )
        }

        return (
            <div>
                <Header/>
                <NavBar/>
                <h2>Current Group: {this.state.currentGroup.name}</h2>
                <Dropdown options={groupLabelValue} onChange={group => this.handleSelectGroup(group)}
                          value={this.state.currentGroup.name}/>
                <h2>Order Page</h2>
                {orderDisplay}
            </div>
        )
    }

}

export default Groceries;
