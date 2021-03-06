import React from "react";
import Wrapper from "./Wrapper";
import Content from "./Content";
import ScrapeBtn from "./ScrapeBtn";
import Header from "./Header";
import CommentBox from "./CommentBox"

class App extends React.Component {
  state = {
    loadedData: [],
    author: "",
    comment: "",
    returnedAuthor: "",
    returnedComment: "",
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
    .then(res => res.json())
    // .then(test => console.log(test));
    // .then(test => console.log(test.comment.body, test.comment.author));
    .then(returned => this.setState({ returnedAuthor: returned.comment.author, returnedComment: returned.comment.body}))
    .catch(err => {
        console.log(err);
        this.setState({returnedAuthor: "no author", returnedComment: "no comment"});
    })
  }

  addComment = id => {
    const inputs = {author: this.state.author, body: this.state.comment};
    console.log(inputs);
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(inputs)
    };
    fetch(`http://localhost:3002/api/data/${id}`, options)
      .then(function(data) {
        console.log("Request success: ", data);
      })
      .catch(function(error) {
        console.log("Request failure: ", error);
      });
  };


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
            addComment={this.addComment}
            author={this.state.returnedAuthor}
            body={this.state.returnedComment}
          >
          </Content>
        ))}
        <CommentBox 
        author={this.state.returnedAuthor}
        body={this.state.returnedComment}
        />
      </Wrapper>
    );
  }
}

export default App;
