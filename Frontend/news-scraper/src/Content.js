import React from "react";
import "./CSS/ContentStyle.css";

const Content = props => {
  return (
    <div className="main" key={props._id} id={props._id}>
      <table>
        <thead>
          <tr>
            <th>{props.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href={"https://www.nytimes.com/" + props.link}>{props.link}</a>
            </td>
          </tr>
          <tr>
            <td>
              <img src={props.image} alt="article" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="comment" />
      <input
        type="text"
        onChange={event => props.change(event)}
        name="author"
        placeholder="Your Name"
      />
      <input
        type="text"
        onChange={event => props.change(event)}
        name="comment"
        placeholder="Your Comment"
      />
      <button onClick={() => props.addComment(props.id)}>Submit</button>
      <div className="commentSection" onClick={() => props.comment(props.id)}>
        <p>Click to see comments</p>
        {/* <p>{props.author}  {props.body}</p> */}
      </div>
    </div>
  );
};

export default Content;
