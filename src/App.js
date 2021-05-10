import logo from './logo.svg';
import './App.css';
import React, {Component, useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchRecipe from './pages/SearchRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Groceries from './pages/Groceries';
import Group from "./pages/Group";
import Ingredients from "./pages/SearchIngredients";
import Login from "./pages/Login";
import useToken from "./components/useToken";
import MealPlans from "./pages/SearchMealPlans";
import Creator from "./pages/Creator";
import CreatorMealPlan from "./pages/CreatorMealPlan";
import CreatorRecipe from "./pages/CreatorRecipe";
import OrderConvert from "./pages/OrderConvert";
import MealPlanDetail from "./pages/MealPlanDetail";

function App() {
    const {token, setToken} = useToken()

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <main>
            <Switch>
                <Route path={'/'} component={Home} exact/>
                <Route path={"/groceries"} component={Groceries}/>
                <Route path={"/group"} component={Group}/>
                <Route path={"/profile"} component={Profile}/>
                <Route path={"/searchrecipe"} component={SearchRecipe}/>
                <Route path={"/searchingredients"} component={Ingredients}/>
                <Route path={"/searchmealplans"} component={MealPlans}/>
                <Route path={"/recipes/detail"} component={RecipeDetail}/>
                <Route path={"/creator"} component={Creator} exact/>
                <Route path={"/creator/mealplan"} component={CreatorMealPlan} exact/>
                <Route path={"/mealplan/detail"} component={MealPlanDetail}/>
                <Route path={"/creator/recipe"} component={CreatorRecipe} exact/>
                <Route path={"/order/convert/group"} component={OrderConvert}/>
          <Route component={Error}/>
            </Switch>
        </main>
    );
}

export default App;
