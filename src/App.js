import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={sigga_logo}
              width="50"
              height="50"
              className="ml-5 mr-3 d-inline-block align-center"
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