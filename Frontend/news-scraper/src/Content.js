import React from "react";

const Content = (props) => {
    return(
    <div>
        <table>
            <th>
                <tr>{props.title}</tr>
                <tr>{props.link}</tr>
                <tr><img src={props.image} alt="article"></img></tr>
            </th>
        </table>
        
    </div>
    )
};

export default Content;