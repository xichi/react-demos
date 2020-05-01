import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const count = this.props.squareCount;
    const squareArray = new Array(count).fill(null);
    return (
      <div className="board-container">
        {squareArray.map((item, idx) => (
          <div className="board-row" key={idx}>
            {squareArray.map((item, jdx) =>
              this.renderSquare(idx * count + jdx + 1)
            )}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(15 * 15).fill(null),
        },
      ],
      squareCount: 15,
      stepNumber: 0,
      xIsNext: true,
      currentSquare: 0,
    };
  }

  handleClick(i, winner) {
    if (winner !== null) {
      alert("此局winner:" + winner + "\n再来一局吧！");
      return;
    } else {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squareCount = this.state.squareCount;
      const squares = current.squares.slice();
      if (squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        currentSquare: i,
      });
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squareCount = this.state.squareCount;
    const squareIndex = this.state.currentSquare;
    const winner = judgeWinner(squareIndex, current.squares, squareCount);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      setTimeout(() => {
        alert("winner:" + winner);
      }, 100);
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squareCount={squareCount}
            squares={current.squares}
            onClick={(i) => this.handleClick(i, winner)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              重来一局！
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

/* function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
} */

//每次落子后检测是否满足胜利条件事件
function judgeWinner(squareIndex, squares, squareCount) {
  const id = squareIndex;
  const j = squareCount;
  const arounds = [
    [
      squares[id],
      squares[id - 1],
      squares[id - 2],
      squares[id - 3],
      squares[id - 4],
    ],
    [
      squares[id],
      squares[id + 1],
      squares[id + 2],
      squares[id + 3],
      squares[id + 4],
    ],
    [
      squares[id],
      squares[id - j],
      squares[id - 2 * j],
      squares[id - 3 * j],
      squares[id - 4 * j],
    ],
    [
      squares[id],
      squares[id + j],
      squares[id + 2 * j],
      squares[id + 3 * j],
      squares[id + 4 * j],
    ],
    [
      squares[id],
      squares[id - (j + 1)],
      squares[id - (j + 1) * 2],
      squares[id - (j + 1) * 3],
      squares[id - (j + 1) * 4],
    ],
    [
      squares[id],
      squares[id + (j + 1)],
      squares[id + (j + 1) * 2],
      squares[id + (j + 1) * 3],
      squares[id + (j + 1) * 4],
    ],
    [
      squares[id],
      squares[id - (j - 1)],
      squares[id - (j - 1) * 2],
      squares[id - (j - 1) * 3],
      squares[id - (j - 1) * 4],
    ],
    [
      squares[id],
      squares[id + (j - 1)],
      squares[id + (j - 1) * 2],
      squares[id + (j - 1) * 3],
      squares[id + (j - 1) * 4],
    ],
  ]; //落棋周围的八个方向棋子

  for (let i = 0; i < arounds.length; i++) {
    if (arounds[i].every((item) => item === squares[squareIndex])) {
      return squares[squareIndex];
    }
  }

  return null;
}
