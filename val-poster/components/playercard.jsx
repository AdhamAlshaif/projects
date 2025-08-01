import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import more from './more.png'
import './playercard.css'

const PlayerCard = (props) => {
  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1)
  }

  return (
    <div className="Card">
      <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <Link to={`/post/${props.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="card-content">
          <h3>Hi I'm {props.username}</h3>
          <p>Win count: {props.win_count}</p>
          <p>Looking for: {props.description}</p>
          <p>Game mode: {props.game_mode}</p>
          <p>Platform: {props.platform}</p>
          <p>Available: {props.availability}</p>
        </div>
      </Link>
      <button className="betButton" onClick={updateCount} >👍 Upvotes: {count}</button>
    </div>
  );
};

export default PlayerCard;