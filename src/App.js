import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchRecipe from './pages/SearchRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Groceries from './pages/Groceries';
import Group from "./pages/Group";
import Ingredients from "./pages/SearchIngredients";

function App() {
  return (
      <main>
        <Switch>
          <Route path={'/'} component={Home} exact/>
          <Route path={"/groceries"} component={Groceries}/>
          <Route path={"/group"} component={Group}/>
          <Route path={"/profile"} component={Profile}/>
          <Route path={"/searchrecipe"} component={SearchRecipe}/>
          <Route path={"/recipes/detail"} component={RecipeDetail}/>
          <Route path={"/searchingredients"} component={Ingredients}/>
          <Route component={Error}/>
        </Switch>
      </main>
  );
}

export default App;
