import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tags: null
    };
  }

  componentDidMount() {
    var stored_tag2name = JSON.parse(localStorage.getItem("tag2name"))
    var tags = [];
    for(var t in stored_tag2name) {
      tags[tags.length] = t;
    }

    this.setState({
      tags: tags
    });
  }

  render() {
    const { error, tags } = this.state;
    if(tags) {
      return(
        <div>
        {this.state.tags.map(
          (item,i) => (
            <span className='mr-4' key={i}>
              <Link to={`?tag=${item}`}>{item}</Link>
            </span>
          )
        )}
        </div>
      );
    } else {
      return <div>...</div>;
    }
  }
}

export default TagList;
