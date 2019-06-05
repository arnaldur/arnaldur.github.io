import React from "react";

class RecipeName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: props.name,
      sha: props.sha
    };
  }

  componentDidMount() {
    var stored = localStorage.getItem(this.state.sha)

    if(stored) {
      this.setState({
        name: stored
      })
    } else {
      fetch("https://raw.githubusercontent.com/arnaldur/uppskriftir/master/" + this.state.name)
      .then(res => res.text())
      .then(
        (result) => {
          // Extract titles
          var rx = /# (.*)\n/;
          var arr = rx.exec(result);
          if( arr && arr.length > 0 ){
            this.setState({
               name: arr[1]
            });
            localStorage.setItem(this.state.sha, this.state.name);
          }

          //extract tags
          var tag_rx = /(^|\s)(#[a-z\d-]+)/ig;
          var stored_tag2name = JSON.parse(localStorage.getItem("tag2name"))
          var tag2name = stored_tag2name || {};

          var match;
          while(match = tag_rx.exec(result)) {
            var tag = match[2];

            // If we found a tag we add the name of the recipe to the set
            // belonging to that tag
            if(tag){
              var names = tag2name[tag];
              if(names == null) {
                names = {};
              }
              names[this.state.name] = true;
              // Push the names back into the index
              tag2name[tag] = names;
            }
          }

          localStorage.setItem("tag2name", JSON.stringify(tag2name));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )
    }
  }

  render() {
    const { error, name, sha} = this.state;
    return name;
  }
}

export default RecipeName;
