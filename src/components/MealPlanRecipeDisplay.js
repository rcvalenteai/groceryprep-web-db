import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";

function MealPlanRecipeDisplay({recipe}) {
    console.log(recipe)
    const name = recipe.name;
    const calories = recipe.calories;
    const description = recipe.description;
    const location = recipe.location;
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }
    // render the UI
    if (recipe) return (
        <div>
            <h2>{name}</h2>
            {descriptionTag}
            <br></br>
            <a href="url">Details</a>
            <div>
                <button type="button">Subscribe</button>
            </div>
        </div>
    )
    return (null);
    }

export default MealPlanRecipeDisplay;


