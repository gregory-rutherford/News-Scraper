import React from "react";
import Wrapper from "./Wrapper";
import Content from "./Content";
import ScrapeBtn from "./ScrapeBtn";
import Header from "./Header";

class App extends React.Component {
  state = {
    loadedData: [],
    author: "",
    comment: ""
  };

  componentDidMount = () => {
    this.displayArticles();
  };

  //called when you press "scrapeBtn"
  scrape = () => {
    fetch(`http://localhost:3002/scrape`).then(res => res.json());
    console.log(this.state);
    this.displayArticles();
  };

  displayArticles = () => {
    fetch(`http://localhost:3002/api/data`)
      .then(res => res.json())
      .then(returned => this.setState({ loadedData: returned }));
    console.log("display articles is working");
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const name = event.target.name;
    const value = event.target.value;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  getComment = id => {
    //get id of article from key attribute
    console.log(id); 
    fetch(`http://localhost:3002/api/data/${id}`)
    .then(res => console.log(res));
  }

  addComment = id => {
    const inputs = {author: this.state.author, body: this.state.comment}
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(inputs)
    };
    fetch(`http:localhost:3002/api/data/${id}`, options)
      .then(function(data) {
        console.log("Request success: ", data);
      })
      .catch(function(error) {
        console.log("Request failure: ", error);
      });
  };

  //write a function that grabs values from the text input, grabs the id of the selected article, and make a post to the db

  render() {
    return (
      <Wrapper>
        <Header />
        <ScrapeBtn clicky={this.scrape} />
        {this.state.loadedData.map(item => (
          <Content
            title={item.title}
            link={item.link}
            image={item.image}
            key={item._id}
            id={item._id}
            change={this.handleInputChange}
            comment={this.getComment}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
