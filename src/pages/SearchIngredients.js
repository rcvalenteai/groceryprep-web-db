import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList"
import IngredientList from "../components/IngredientList"
import MultiSelect from "react-multi-select-component";
import Dropdown from "react-dropdown"
import qs from "querystring"
import stylesheet from "../css/ListItemDisplay.css"

class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemCount: 0,
            tags: [],
            currentGroup: {},
            userGroups: [],
            selectedTags: [],
            searchFilter: "",
            loading: true,
        }
        //this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchAllSearchTags();
        this.fetchUserGroups();
        this.fetchSearchIngredients();
    }

    fetchAllSearchTags = async () => {
        let get_tags_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/tags";
        let data = await fetch(get_tags_url)
        let tagsData = await data.json()
        this.setState({
            tags: tagsData.items,
        })
    }

    fetchUserGroups = async () => {
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let get_user_groups_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group/";
        get_user_groups_url += sessionState.userUrl
        let data = await fetch(get_user_groups_url)
        let user_groupsData = await data.json()

        this.setState({
            userGroups: user_groupsData.items,
        })

        if (sessionState.groupUrl != "group?groupId=None") {
            let currentGroup = user_groupsData.items.find((e) => e.location === sessionState.groupUrl)
            this.setState({
                currentGroup: currentGroup,
            })
        }
    }

    fetchSearchIngredients = async () => {
        let search = this.state.searchFilter;
        let tags = this.state.selectedTags.map(obj => {
            return obj.value;
        })
        let queryObj = {}
        let get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/ingredients";
        if (search) {
            queryObj["search"] = search
        }
        if (tags.length > 0) {
            queryObj["tags"] = tags.toString()
        }
        let query = qs.stringify(queryObj)
        get_recipes_url += "?" + query
        let data = await fetch(get_recipes_url)
        let recipeData = await data.json()
        this.setState({
            items: recipeData.items,
            itemCount: recipeData.item_count,
            loading: false
        })

    }

    handleSelectedTags(selected) {
        //let value = event.target.value;
        this.setState({
                selectedTags: selected,
            },
            function () { this.fetchSearchIngredients() }
        )
    }

    handleSearch(event) {
        event.preventDefault()
        this.fetchSearchIngredients()
    }

    searchChangeHandler(event) {
        this.setState({
            searchFilter: event.target.value
        })
    }

    handleSelectGroup(group) {
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        sessionStorage['groupUrl'] = group.value.location
        window.sessionStorage.setItem('token', JSON.stringify(sessionStorage))
        this.setState({
            currentGroup: group.value
        })
    }

    render() {
        const loading = this.state.loading;
        let recipeList;
        if (!loading) {
            recipeList = (
                <IngredientList
                    data={this.state.items}
                />
            )
        } else {
            recipeList = <h1>Loading...</h1>
        }
        let tagsLabelValue;
        let tags = this.state.tags;
        tagsLabelValue = tags.map(tag => {
            let labelValueObj = {}
            labelValueObj["label"] = tag
            labelValueObj["value"] = tag
            return labelValueObj
        })

        let groupLabelValue;
        let groups = this.state.userGroups;
        groupLabelValue = groups.map(group => {
            let labelGroupValue = {}
            labelGroupValue["label"] = group.name
            labelGroupValue["value"] = group
            return labelGroupValue
        })

        return (
            <div>
                <Header />
                <NavBar />
                <h2>Current Group: {this.state.currentGroup.name}</h2>
                <p >Change Group:
                    <Dropdown className='dropdownItem' options={groupLabelValue} onChange={group => this.handleSelectGroup(group)} value={this.state.currentGroup.name} /></p>
                <h2>Search Ingredient Page</h2>
                <form onSubmit={e => this.handleSearch(e)}>
                    <label>
                        Search by Ingredient Name:
                        <input type="text" value={this.state.searchFilter} onChange={e => this.searchChangeHandler(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <MultiSelect options={tagsLabelValue} value={this.state.selectedTags}
                             onChange={selected => this.handleSelectedTags(selected)} labelledBy="Select"
                />
                {recipeList}
            </div>
        )
    }
}

export default SearchRecipe;
