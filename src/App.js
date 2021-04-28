import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';

function App() {
  return (
      <main>
        <Switch>
          <Route path={'/'} component={Home} exact/>
          <Route path={"/about"} component={About}/>
          <Route path={"/shop"} component={Shop}/>
          <Route component={Error}/>
        </Switch>
      </main>
  );
}

export default App;
