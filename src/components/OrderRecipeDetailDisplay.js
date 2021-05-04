import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";
import stylesheet from '../css/ListItemDisplay.css'

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
        <div className='listItemDisplay'>
            <h2>{name}</h2>
            <p>Order Quantity: {orderQuantity}</p>
            <p>Calories: {calories}</p>
            <p>Price: {price}</p>
            <p>Servings: {servings}</p>
            {descriptionTag}
            <h4>Ingredients:</h4>
            {recipe.items.map((ingredient, index) => {
                return <RecipeIngredientDisplay key={index} ingredient={ingredient}/>;
            })}
            {/* <br></br> */}
        </div>
        <br></br>
        </div>
    )
    return (null);
    }

export default OrderRecipeDetailDisplay;
