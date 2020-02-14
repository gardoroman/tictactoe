import React from 'react';

function Square(props) {
  const squareClass = props.isBold ? "square bold-square" : "square"
  return (
    <button className={squareClass} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square;