import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";

function IngredientListDisplay({ingredient}) {
    const name = ingredient.iname;
    const calories = ingredient.calories;
    const quantity = ingredient.quantity;
    const unit = ingredient.unit;
    const servings = ingredient.servings;
    let descriptionTag;

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const price = formatter.format(ingredient.price);
    // render the UI
    if (ingredient) return (
        <div>
            <h2>{name}</h2>
            <h3>Calories: {calories}</h3>
            <h3>Price: {price}</h3>
            <h3>Servings: {servings}</h3>
            <h3>Quantity: {quantity} {unit}</h3>
            <br></br>
        </div>
    )
    return (null);
    }

export default IngredientListDisplay;
