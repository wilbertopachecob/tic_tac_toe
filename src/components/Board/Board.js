import { useState } from "react";

import css from "./Board.module.scss";
import { MOVES, WINNERS, WINNING_MOVES } from "constants";
import Square from "components/Square/Square.js";
import { boundClassNames } from "utilities";

const initialState = {
  blocks: Array(9).fill(null),
  lastMove: MOVES.O,
  gameOver: null,
  winner: null,
};

const Board = () => {
  const [blocks, setBlocks] = useState(initialState.blocks);
  const [lastMove, setLastMove] = useState(initialState.lastMove);
  const [gameOver, setGameOver] = useState(initialState.gameOver);
  const [winner, setWinner] = useState(initialState.winner);

  const isWinningMove = (_blocks, index) => {
    return !!WINNING_MOVES.filter((move) => move.includes(index)).find((move) =>
      move.every((i) => _blocks[i] === _blocks[index])
    );
  };

  const onChangeHandler = (index) => {
    const gameIsCompleted = blocks.every((value) => value !== null);
    const currentMove = lastMove === MOVES.O ? MOVES.X : MOVES.O;

    if (gameOver) {
      return;
    }

    if (gameIsCompleted) {
      setGameOver(true);
      setWinner(WINNERS.TIE);
      return;
    }

    if (!gameIsCompleted && blocks[index] === null) {
      const blocksCopy = [...blocks];
      blocksCopy[index] = currentMove;
      setBlocks(blocksCopy);
      if (isWinningMove(blocksCopy, index)) {
        setGameOver(true);
        setWinner(WINNERS[currentMove]);
        return;
      }
      setLastMove(currentMove);
    }
  };

  const reset = () => {
    setBlocks(initialState.blocks);
    setLastMove(initialState.lastMove);
    setGameOver(initialState.gameOver);
    setWinner(initialState.winner);
  };

  return (
    <div className={boundClassNames("container mt-4", css["board-container"])}>
      <div className={css["square-container"]}>
        <div className="row">
          <Square value={blocks[0]} onChange={() => onChangeHandler(0)} />
          <Square value={blocks[1]} onChange={() => onChangeHandler(1)} />
          <Square value={blocks[2]} onChange={() => onChangeHandler(2)} />
        </div>
        <div className="row">
          <Square value={blocks[3]} onChange={() => onChangeHandler(3)} />
          <Square value={blocks[4]} onChange={() => onChangeHandler(4)} />
          <Square value={blocks[5]} onChange={() => onChangeHandler(5)} />
        </div>
        <div className="row">
          <Square value={blocks[6]} onChange={() => onChangeHandler(6)} />
          <Square value={blocks[7]} onChange={() => onChangeHandler(7)} />
          <Square value={blocks[8]} onChange={() => onChangeHandler(8)} />
        </div>
      </div>
      {winner && (
        <>
          <h2 className="mt-5"> Winner is: {winner}</h2>
          <button className="btn btn-primary" onClick={reset}>
            Start again
          </button>
        </>
      )}
    </div>
  );
};

export default Board;
