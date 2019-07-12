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

      <div className="comment"></div>
      <input type="text" onChange={(event)=>props.change(event)} name="author" ></input>
      <input type="text" onChange={(event)=>props.change(event)} name="comment" ></input>
      <button onClick={()=> props.comment(props.id)}>Submit</button>
    </div>

  );
};

export default Content;
