import React from "react";
import Wrapper from "./Wrapper";
import Content from "./Content";
import ScrapeBtn from "./ScrapeBtn";

class App extends React.Component{

    state = {
        loadedData: [],
        dummyData: [{
            title:"a title",
            link:"the link url",
            image:"the image url",
            id: 1
        }, {
            title: "test1",
            link: "test2",
            image: "test3",
            id: 2
        }]
    }

    onComponentDidMount = () => {
        return fetch (`http://localhost:3002/api/data`)
        .then(res => res.json())
        .then(returned => this.setState({loadedData: returned}));
    }

    scrape = () => {
        fetch (`http://localhost:3002/api/data`)
        .then(res => res.json())        
        .then(returned => this.setState({loadedData: returned}));
        console.log(this.state); 
    }

    render(){
        return(
            <Wrapper>
                {this.state.loadedData.map(item => (
                <Content
                title={item.title}
                link={item.link}
                image={item.image}
                key={item.id}
                /> 
                )
                )}
                <ScrapeBtn 
                clicky={this.scrape}
                />
                
            </Wrapper>
        )
    }

}

export default App;