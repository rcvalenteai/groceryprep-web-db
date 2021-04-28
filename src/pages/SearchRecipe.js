import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import RecipeTable from "../components/RecipeList"

class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items			: [],
      itemCount : 0,
      //dataSource	: [],
      //filter    	: '',
      loading		: true,
    }
    //this.handleDelete = this.handleDelete.bind(this);
  }

	componentDidMount() { this.fetchAllRecipes() }

	fetchAllRecipes = async () => {
		var get_recipes_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes"; 
		var data = await fetch(get_recipes_url)
		var recipeData = await data.json()
		this.setState({ items: recipeData.items,
                    itemCounte: recipeData.item_count,
                    //dataSource: recipeData.list.filter(recipe =>
                                //recipe.recipeID.includes(this.state.filter)),
                    			//dataSource: recipeData.list,
                    loading: false  })
	}

	render() {
        console.log(this.state.items)
        const loading = this.state.loading;
        console.log(loading)
        let recipeList;
        if (!loading) {
          recipeList = (
                    <RecipeTable
                        data				= { this.state.items }
            />
          )
        } else {
          recipeList = <h1>Loading...</h1>
        }

        return (
            <div>
            <Header/>
            <NavBar/>
            <h1>Search Recipe Page</h1>
            {recipeList}
                </div>
            )
	}
}

export default SearchRecipe;
