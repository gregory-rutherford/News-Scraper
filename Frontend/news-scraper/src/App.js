import React from "react";
import Wrapper from "./Wrapper";
import Content from "./Content";
import ScrapeBtn from "./ScrapeBtn";
import Header from "./Header";

class App extends React.Component{

    state = {
        loadedData: [],
        author: "Author",
        comment: "Comment"
    }

    componentDidMount = () => {
        this.displayArticles();
    }

    

    //called when you press "scrapeBtn"
    scrape = () => {
        fetch (`http://localhost:3002/scrape`)
        .then(res => res.json());        
        // .then(returned => this.setState({loadedData: returned}));
        console.log(this.state); 
        this.displayArticles();
    }

    displayArticles = () => {
        fetch (`http://localhost:3002/api/data`)
        .then(res => res.json())
        .then(returned => this.setState({loadedData: returned}));
        console.log("display articles is working")
    }
    

    // getCommentValues = event => {
    //     const author = this.event.target.name;
    //     const comment = this.event.target.value;
    //     this.setState({ [this.name]: this.value});
    // }

    // postComment = (event) => {
    //     event.preventDefault();
    //     const author2 = this.state.author;
    //     const comment2 = this.state.comment;
    //     const artId = this.props._id;
    //     const options = {
    //         headers: {"Content-Type": "application/json"},
    //         method: "POST",
    //         body: author2, comment2,
    //         }
    //         fetch(`http://localhost:3002/api/data/${artId}`, options)
    //         .then(res => res.json())
    //         .then(res => console.log(res));
    // }

    render(){
        return(
            <Wrapper>
                <Header />
                <ScrapeBtn 
                clicky={this.scrape}
                />
                {this.state.loadedData.map(item => (
                <Content
                title={item.title}
                link={item.link}
                image={item.image}
                key={item._id}
                clickPost={this.postComment}
                commentValues={this.getCommentValues}
                /> 
                )
                )}
            </Wrapper>
        )
    }

}

export default App;