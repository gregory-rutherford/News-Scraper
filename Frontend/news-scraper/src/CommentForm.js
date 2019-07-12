import React from "react";

class CommentForm extends React.Component{
    state = {
        author: "",
        body: ""
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
    
      handleFormSubmit = event => {
        event.preventDefault();
        //grabbing user info from state
        const inputs = this.state;
        const options = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(inputs),
        }
        fetch(`http://localhost:3001/api/data/`, options)
        .then(res => res.json())
        .then(res => console.log(res));
      };
    
    
    
  
    
      render() {
        return (
          <div>
            <form className="form">
              <input
                value={this.state.author}
                name="author"
                onChange={this.handleInputChange}
                type="text"
                placeholder="author"
              />
              <input
                value={this.state.body}
                name="body"
                onChange={this.handleInputChange}
                type="body"
                placeholder="body"
              />
              <button onClick={this.handleFormSubmit}>Submit</button>
            </form>
          </div>
        );
      }
    }

    export default CommentForm;