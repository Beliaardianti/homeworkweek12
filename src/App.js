import * as React from 'react';

function Square({ value, onClick }) {
  return (
    <button
      className="square bg-black text-green-500 font-bold text-3xl p-8 border transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState(calculateNextValue(squares));
  const winner = calculateWinner(squares);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue(calculateNextValue(Array(9).fill(null)));
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => selectSquare(i)}
      />
    );
  }

  const status = calculateStatus(winner, squares, nextValue);

  function renderBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push(renderSquare(i));
    }
  
    return (
      <div className="grid grid-cols-3">
        {board}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-8 text-green-700">{status}</div>
      {renderBoard()}
      <button
        className="bg-green-800 text-white px-6 py-3 mt-8 rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
  
  
  

}

function Game() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Board />
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function App() {
  return <Game />;
}

export default App;
