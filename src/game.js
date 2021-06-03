import React from 'react';
import './index.css';
import Board from './board'
import {calculateWinner} from './helper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState(){
    return({
      history: [{
        squares: Array(9).fill(null),
      }],
      locations: ['Go to game start'],
      xIsNext: true,
      stepNumber: 0
    });
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    const locations = this.state.locations.slice(0, this.state.stepNumber + 1);
    const winningSquares = calculateWinner(squares);

    // If the square already has a value 
    // or winningSqaures are returned, 
    //prevent any further action
    if(squares[i] || winningSquares) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const row = Math.floor(i / 3 )  + 1;
    const col = (i % 3 ) + 1 ;

    locations.push(`row: ${row}, col: ${col}`);

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      locations: locations,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  addMove(move, desc, isCurrentMove) {
    const description = isCurrentMove ? <b> {desc} </b> : desc;

    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}> {description} </button>
      </li>
    )
  }

  resetGame(){
    this.setState(this.getDefaultState());
  }

  render() {
    const history = this.state.history;
    const locations = this.state.locations;
    const current = history[this.state.stepNumber];
    const winningSquares = calculateWinner(current.squares);
    const noWinners = current.squares.every(i => i === 'X' || i === 'O')
    const currentStep = this.state.stepNumber;

    const moves = history.map((step, move) => {
      const location = locations[move];
      const desc = move ? 'Go to move #' + move  + ' ' + location: location;
      const isCurrentMove = currentStep === move;
      return (this.addMove(move, desc, isCurrentMove))
    });
    let status;
    if (winningSquares) {
      status = 'Winner: ' + current.squares[winningSquares[0]];
    } else if (noWinners) {
      status = 'Draw'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div>
          <div className="game">
            <div className="game-board">
              <div className="status">{status}</div>
              <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                winningSquares={winningSquares}
              />
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
          <div>
            <button onClick={()=> this.resetGame()}>
              New Game
            </button>
          </div>
        </div>

      
    );
  }
}

export default Game;