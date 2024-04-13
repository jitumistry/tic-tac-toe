import React from 'react';
import './board.css';

const Square = (props) => {
  return (
    <div className="box" onClick={props.onClick}>{props.value}</div>
  )
}

export default Square