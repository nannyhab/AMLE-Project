import './App.css';
import { useState } from "react";

function Square ({value, onSquareClick}) {
  
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [boardVar, setValue] = useState(Array(9).fill(null));
  const [xIsNext, setValueXO] = useState(true);
  

  function handleClick(i)
  //This is a closure function (function within a function that has access to 
  //                            variables in parent function)
  {
    const clickSquareList = boardVar.slice();
    if (clickSquareList[i] || discoverWinner(clickSquareList)){
      return;
    } 

    if (xIsNext === true){
      clickSquareList[i] = "X";
      setValueXO(false);
    }
    else if (xIsNext === false){
      clickSquareList[i] = "O";
      setValueXO(true);
    }
    setValue(clickSquareList);
  } 
  function discoverWinner(squares)
  {
    const winnerArray = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [2,4,6],[0,4,8]
    ];
    for (let i=0; i< winnerArray.length; i++)
    {
      const [a,b,c] = winnerArray[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      {
        return squares[a];
      }
    }
    return null;
  }
  const winner = discoverWinner(boardVar);
  let status;
  if (winner)
  {
    status = "Winner " + winner;
  }
  else
  {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
  <>
  <div className="status">{status}</div>
  <div className="board-row">
    <Square value={boardVar[0]} onSquareClick={()=>handleClick(0)} /> 
    <Square value={boardVar[1]} onSquareClick={()=>handleClick(1)}/> 
    <Square value={boardVar[2]} onSquareClick={()=>handleClick(2)}/> 
  </div>
  <div className="board-row">
  <Square value={boardVar[3]} onSquareClick={()=>handleClick(3)}/> 
    <Square value={boardVar[4]} onSquareClick={()=>handleClick(4)}/> 
    <Square value={boardVar[5]} onSquareClick={()=>handleClick(5)}/>
  </div>
  <div className="board-row">
  <Square value={boardVar[6]} onSquareClick={()=>handleClick(6)}/> 
    <Square value={boardVar[7]} onSquareClick={()=>handleClick(7)}/> 
    <Square value={boardVar[8]} onSquareClick={()=>handleClick(8)}/>
  </div>
  </>
  );
}

export default function Game() {
  const [gameIterations, setGameIteration] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);

  function onGameClick({})
  {

  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
