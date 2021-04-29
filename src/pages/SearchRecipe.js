import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList"
import MultiSelect from "react-multi-select-component";
import qs from "querystring"

class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemCount: 0,
            //dataSource	: [],
            //filter    	: '',
            tags: [],
            selectedTags: [],
            searchFilter: "",
            loading: true,
        }
        //this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchAllSearchTags();
        this.fetchAllRecipes();
    }

    fetchAllRecipes = async () => {
        let get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes";
        let data = await fetch(get_recipes_url)
        let recipeData = await data.json()
        this.setState({
            items: recipeData.items,
            itemCount: recipeData.item_count,
            loading: false
        })
    }

    fetchAllSearchTags = async () => {
        let get_tags_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/tags";
        let data = await fetch(get_tags_url)
        let tagsData = await data.json()
        this.setState({
            tags: tagsData.items,
        })
    }

    fetchSearchRecipes = async () => {
        let search = this.state.searchFilter;
        console.log(search)
        let tags = this.state.selectedTags.map(obj => {
            return obj.value;
        })
        let queryObj = {}
        let get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes";
        if (search) {
            queryObj["search"] = search
        }
        if (tags) {
            queryObj["tags"] = tags.toString()
        }
        let query = qs.stringify(queryObj)
        get_recipes_url += "?" + query
        console.log(query)
        console.log(get_recipes_url)
        console.log(this.state.selectedTags)
        console.log(tags.toString())
        let data = await fetch(get_recipes_url)
        let recipeData = await data.json()
        this.setState({
            items: recipeData.items,
            itemCount: recipeData.item_count,
            //dataSource: recipeData.list.filter(recipe =>
            //recipe.recipeID.includes(this.state.filter)),
            //dataSource: recipeData.list,
            //loading: false
        })

    }

    handleSelectedTags(selected) {
        //let value = event.target.value;
        console.log("Selected")
        console.log(selected)
        this.setState({
                selectedTags: selected,
            },
            function() {this.fetchSearchRecipes()}
        )
    }

    handleSearch(event) {
        event.preventDefault()
        console.log("Search")
        this.fetchSearchRecipes()
    }

    searchChangeHandler(event) {
        this.setState({
            searchFilter: event.target.value
        })
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
        let tagsLabelValue;
        let tags = this.state.tags;
        tagsLabelValue = tags.map(tag => {
            let labelValueObj = {}
            labelValueObj["label"] = tag
            labelValueObj["value"] = tag
            return labelValueObj
        })

        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Search Recipe Page</h1>
                <form onSubmit={e => this.handleSearch(e)}>
                    <label>
                        Search by Recipe Name:
                        <input type="text" value={this.state.searchFilter} onChange={e => this.searchChangeHandler(e)}/>
                    </label>
                    <input type="submit" value="Submit"/>
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
