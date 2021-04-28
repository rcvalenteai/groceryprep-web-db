import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function RecipeListDisplay({recipe}) {
    const name = recipe.name;
    const calories = recipe.calories;
    const description = recipe.description;
    const location = recipe.location;
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }
    // render the UI
    if (recipe) {
        return (
            <div>
                <h2>{name}</h2>
                <h3>Calories: {calories}</h3>
                {descriptionTag}
                <Link to={location}>Details</Link>
                <br></br>
            </div>
        )
    }
        return (null);
    }

export default RecipeListDisplay;
