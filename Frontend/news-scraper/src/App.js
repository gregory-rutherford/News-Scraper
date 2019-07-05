import React from "react";
import Wrapper from "./Wrapper";
import Content from "./Content";

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
    render(){
        return(
            <Wrapper>
                {this.state.dummyData.map(item => (
                <Content
                title={item.title}
                link={item.link}
                image={item.image}
                id={item.id}
                /> 
                )
                )}
                
            </Wrapper>
        )
    }

}

export default App;