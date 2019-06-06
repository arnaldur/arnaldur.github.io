import React from "react";
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ReactMarkdown = require('react-markdown')

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: ""
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/arnaldur/uppskriftir/master/" + this.props.file)
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
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

  onError(e) {
    e.target.setAttribute("src", "");
  }

  render() {
    const { error, isLoaded, data } = this.state;
    console.log(data);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Container><Row><Col><div>Loading...</div></Col></Row></Container>;
    } else {
      const recipe_image = "https://raw.githubusercontent.com/arnaldur/uppskriftir/master/" + this.props.file.replace("md", "jpg");
      return (
        <Container className='mt-5'>
          <Row>
            <Col>
              <Image fluid src={recipe_image} onError={this.onError}/>
              <ReactMarkdown source={data} />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default RecipeDetail;
