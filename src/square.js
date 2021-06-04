import React from 'react';

function Square(props) {
  // let square = "text-3xl"
  let square = "float-left p-0 border-4 border-pink-700 w-48 h-48 text-9xl focus:outline-none";
  const squareClass = props.isBold ? square + " font-bold" : square;
  return (
    <button className={squareClass} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square;