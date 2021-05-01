import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";

function OrderRecipeDetailDisplay({recipe}) {
    const name = recipe.name;
    const calories = recipe.calories;
    const orderQuantity = recipe.order_quantity;
    const servings = recipe.servings;
    const description = recipe.description;
    const location = recipe.location;
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const price = formatter.format(recipe.price);
    // render the UI
    if (recipe) return (
        <div>
            <h2>{name}</h2>
            <h3>Order Quantity: {orderQuantity}</h3>
            <h3>Calories: {calories}</h3>
            <h3>Price: {price}</h3>
            <h3>Servings: {servings}</h3>
            {descriptionTag}
            <h4>Ingredients:</h4>
            {recipe.items.map((ingredient) => {
                return <RecipeIngredientDisplay ingredient={ingredient}/>;
            })}
            <br></br>
        </div>
    )
    return (null);
    }

export default OrderRecipeDetailDisplay;
