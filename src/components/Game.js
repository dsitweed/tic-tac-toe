//Se thay doi va tuong tac voi cac o
import React, { Component } from "react";
import Board from "./Board";
let end = 0 ;

export default class Game extends Component {
  constructor(props) {
    super(props);
    //history la mot mang chua cac trang thai
    this.state = {
        history: [{
            squares : Array(9).fill(null),
        }],
        stepNumber: 0,//Buoc di dang thuc hien
        xIsNext : true,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    console.log(history);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //Neu da co Winner hoac square da duoc dien thi return
    if (calculateWinner(squares) || squares[i]){
        console.log("can't");
        return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
        // Day la doan kho nhat ca chuong trinh
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,//Buoc di dang thuc hien
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    const history = this.state.history.slice(0,step+1); 
    this.setState({
        stepNumber: step,
        history: history,
        xIsNext: (step % 2) ? false : true,
    })
  }

  render() {
    const history = this.state.history;
    end = this.state.stepNumber;
    //Vi bat dau tu 0
    //current la 1 object
    const current = history[this.state.stepNumber];
    //console.log(current);//Trang thai hien tai
    const winner = calculateWinner(current.squares);
    //set move
    const moves = history.map((step, move) => {
        console.log("map method:",step,move);
        //if move = 0 thi start else goto the move
        const desc = move ?
        'Go to the move #' + move :
        'Go to game start';
        return (
            <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    //Set status
    let status;
    if (this.state.xIsNext) status = "Next player: X";
    else status = "Next player: O";
    //If have the winner
    if (winner != null) status = "Winner: " + winner;
    if (winner != null && winner === "Hoa") status = "Kết quả hòa";

    return (
      <div className="game">
        <div className="game-broad">
          <Board
          squares = {current.squares}
          status={status}
          onClick ={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    //Cac truong hop thang (8 TH)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && (squares[a] === squares[b]) &&
        (squares[a]) === squares[c])
        return squares[a];
    }
    //Neu ko co 3 o trung nhau nowinner -> null
    if (end === 9)
      return "Hoa";
    return null;
  }
