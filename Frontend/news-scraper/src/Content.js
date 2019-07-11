import React from "react";
import "./CSS/ContentStyle.css";

const Content = props => {
 
  return (
    <div className="main" key={props._id}>
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
      <div className="comment"></div>
      {/* <h2></h2>
      <h3></h3> */}
      {/* <form>
        <input onChange={()=> props.commentValues(props.event)} type="text" placeholder="Your Name" value={props.author} name="author"></input>
        <input onChange={()=> props.commentValues(props.event)} type="text" placeholder="Comment" value={props.comment} name="comment"></input>
        <button onClick={()=> props.clickPost(this.event)}>Submit Comment</button>
      </form> */}

    </div>
  );
};

export default Content;
