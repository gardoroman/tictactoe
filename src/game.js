import React from 'react';
import './index.css';
import Board from './board'
import {calculateWinner} from './helper';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    console.log("hi")
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // The squares[i] prevents a previously played
    // square from being overwritten
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  render() {
    const history = this.state.history;
    console.log('first history', history)

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    console.log('first winner', winner)
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {/* <div className="status">{ status }</div> */}
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;