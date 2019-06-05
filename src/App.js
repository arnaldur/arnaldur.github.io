import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import RecipeName from './components/RecipeName';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

import sigga_logo from './logo.svg'

function Index() {
  return <RecipeList name="Sigga"/>
}

function RecipeDetailRoute({match}) {
  return <RecipeDetail file={match.params.filename}/>
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/ ">
            <img
              alt=""
              src={sigga_logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {'  Eldhús Siggu'}
          </Navbar.Brand>
        </Navbar>

        <Route path="/" exact component={Index} />
        <Route path="/recipes/:filename" component={RecipeDetailRoute} />
      </div>
    </Router>
  );
}

export default AppRouter;