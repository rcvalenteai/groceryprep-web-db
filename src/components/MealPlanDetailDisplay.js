import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";
import RecipeListDisplay from "./RecipeListDisplay";
import MealPlanRecipeCreatorDisplay from "./MealPlanRecipeCreatorDisplay";

function MealPlanDetailDisplay({mealplan}) {
    const name = mealplan.name;
    const description = mealplan.description;
    const location = mealplan.location;
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }
    // render the UI
    if (mealplan) return (
        <div>
            <h2>{name}</h2>
            {descriptionTag}
            <h4>Recipes:</h4>
            {mealplan.recipes.items.map((recipe, index) => {
                return <MealPlanRecipeCreatorDisplay key={index} recipe={recipe}/>;
            })}
            <br></br>
        </div>
    )
    return (null);
}

export default MealPlanDetailDisplay;
