import React from "react";

const Content = (props) => {
    return(
    <div>
        <table>
            <th>
                <tr>{props.title}</tr>
                <tr>{props.link}</tr>
                <tr>{props.image}</tr>
            </th>
        </table>
        
    </div>
    )
};

export default Content;