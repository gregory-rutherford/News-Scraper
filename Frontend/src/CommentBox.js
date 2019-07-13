import React from "react";

const CommentBox = props => {
    return (
        <div>
            <p>
                {props.author + " "} {props.body}
            </p>
        </div>
    )
}



export default CommentBox;