import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import RecipeName from './RecipeName'
import TagList from './TagList'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      active_filter: null
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

  onChange(event) {
    var filterValue = event.target.value;
    this.setState({
      active_filter: filterValue
    });
    this.render();
  }

  render() {
    const { error, isLoaded, items, active_filter } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Container className='mt-5'><Row><Col><div>Loading...</div></Col></Row></Container>;
    } else {
      var filtered_items = items;

      if(active_filter != null) {
        filtered_items = filtered_items.filter(function(item){
          return item.name.toLowerCase().search(active_filter.toLowerCase()) !== -1;
        });
      }
      return (
          <Container className='mt-5'>
            <Row className='mb-4'>
              <Col>
                <TagList/>
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col>
                <FormControl
                  onChange={this.onChange.bind(this)}
                  placeholder="Leit"
                />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col>
              {filtered_items.map(item => (
                <div key={item.name}>
                  <Link to={`/recipes/${item.name}`}>
                    <RecipeName sha={item.sha} name={item.name}/>
                  </Link>
                </div>
              ))}
              </Col>
            </Row>
          </Container>
      );
    }
  }
}

export default RecipeList;
