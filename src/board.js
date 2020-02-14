import React from 'react';
import Square from './square';

class Board extends React.Component {

  renderSquare(i) {
    const currentSquare = this.props.squares[i];
    const isBold = this.props.winningSquares && (this.props.winningSquares[0] == currentSquare);
    return (
      <Square 
        key={i}
        value={currentSquare}
        onClick={() => this.props.onClick(i)}
        isBold={isBold}
      />
    );
  };

  createBoard() {
    const divs = [];
    const row = 3;
    for(let i =0; i < row; i++){
      const items = [];
      for(let j = 0; j < row; j++){
        let square = (i * 3) + j;
        items.push(this.renderSquare(square))
      }
      divs.push(<div key={i} className="board-row">{items}</div>)  
    }
    return divs
  }

  render() {
    return <div> {this.createBoard()} </div>;
  }
}

export default Board;
