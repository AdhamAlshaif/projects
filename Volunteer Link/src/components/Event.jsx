import React from "react";
const Event = (props) => {
  return (
    <div className="org-container">
      <div className="org">
        <img className="v-img" src={props.img} />
        <h1>{props.name}</h1>
        <h5>{props.location}</h5>
        <button>
          <a href={props.link} target="_blank">
            View
          </a>
        </button>
      </div>
    </div>
  );
};
export default Event;
