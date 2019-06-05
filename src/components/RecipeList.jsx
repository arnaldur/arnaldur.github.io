import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RecipeName from './RecipeName';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/repos/arnaldur/uppskriftir/contents/")
      .then(res => res.json())
      .then(
        (result) => {
          const result_filtered = result.filter((x) => x.name.endsWith(".md") )
          this.setState({
            isLoaded: true,
            items: result_filtered
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Container><Row><Col><div>Loading...</div></Col></Row></Container>;
    } else {
      return (
          <Container className='mt-5'><Row><Col>
          {items.map(item => (
            <div key={item.name}>
              <Link to={`/recipes/${item.name}`}><RecipeName sha={item.sha} name={item.name}/> </Link>
            </div>
          ))}
        </Col></Row></Container>
      );
    }
  }
}

export default RecipeList;
