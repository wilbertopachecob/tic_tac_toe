import React, { useState, useCallback, useMemo } from "react";
import css from "./Board.module.scss";
import {
  PLAYERS,
  GAME_RESULTS,
  GAME_STATUS,
  WINNING_COMBINATIONS,
  BOARD_CONFIG,
  MESSAGES,
} from "../../constants";
import Block from "../Block/Block.js";
import { allEqual } from "../../utilities";

/**
 * Initial game state
 */
const INITIAL_STATE = {
  blocks: Array(BOARD_CONFIG.SIZE).fill(null),
  currentPlayer: PLAYERS.O,
  gameStatus: GAME_STATUS.PLAYING,
  winner: GAME_RESULTS.IN_PROGRESS,
  winningBlocks: [],
};

/**
 * Board component - Main game container
 * @returns {JSX.Element} Board component
 */
const Board = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);

  /**
   * Check if the current move results in a win
   * @param {Array} blocks - Current board state
   * @param {number} moveIndex - Index of the last move
   * @param {string} player - Player who made the move
   * @returns {Object} Object containing win status and winning blocks
   */
  const checkWin = useCallback((blocks, moveIndex, player) => {
    for (const combination of WINNING_COMBINATIONS) {
      if (combination.includes(moveIndex)) {
        const line = combination.map(index => blocks[index]);
        if (allEqual(line, player)) {
          return {
            isWin: true,
            winningBlocks: combination,
          };
        }
      }
    }
    return { isWin: false, winningBlocks: [] };
  }, []);

  /**
   * Check if the game is a tie
   * @param {Array} blocks - Current board state
   * @returns {boolean} True if game is tied
   */
  const checkTie = useCallback((blocks) => {
    return blocks.every(block => block !== null);
  }, []);

  /**
   * Handle block click
   * @param {number} index - Index of the clicked block
   */
  const handleBlockClick = useCallback((index) => {
    if (gameState.gameStatus === GAME_STATUS.FINISHED) {
      return;
    }

    if (gameState.blocks[index] !== null) {
      return;
    }

    const newBlocks = [...gameState.blocks];
    newBlocks[index] = gameState.currentPlayer;

    // Check for win
    const { isWin, winningBlocks } = checkWin(
      newBlocks,
      index,
      gameState.currentPlayer
    );

    if (isWin) {
      setGameState(prev => ({
        ...prev,
        blocks: newBlocks,
        gameStatus: GAME_STATUS.FINISHED,
        winner: gameState.currentPlayer,
        winningBlocks,
      }));
      return;
    }

    // Check for tie
    if (checkTie(newBlocks)) {
      setGameState(prev => ({
        ...prev,
        blocks: newBlocks,
        gameStatus: GAME_STATUS.FINISHED,
        winner: GAME_RESULTS.TIE,
      }));
      return;
    }

    // Continue game
    setGameState(prev => ({
      ...prev,
      blocks: newBlocks,
      currentPlayer: prev.currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
    }));
  }, [gameState, checkWin, checkTie]);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  /**
   * Get current game message
   */
  const gameMessage = useMemo(() => {
    if (gameState.gameStatus === GAME_STATUS.FINISHED) {
      switch (gameState.winner) {
        case GAME_RESULTS.X_WINS:
          return MESSAGES.X_WINS;
        case GAME_RESULTS.O_WINS:
          return MESSAGES.O_WINS;
        case GAME_RESULTS.TIE:
          return MESSAGES.TIE;
        default:
          return "";
      }
    }
    return gameState.currentPlayer === PLAYERS.X
      ? MESSAGES.X_TURN
      : MESSAGES.O_TURN;
  }, [gameState.gameStatus, gameState.winner, gameState.currentPlayer]);

  /**
   * Render game blocks
   */
  const renderBlocks = () => {
    return gameState.blocks.map((value, index) => (
      <Block
        key={index}
        value={value}
        onClick={() => handleBlockClick(index)}
        isWinningBlock={gameState.winningBlocks.includes(index)}
        index={index}
      />
    ));
  };

  return (
    <div className={css.boardContainer}>
      <div className={css.gameInfo}>
        <h2 className={css.gameMessage}>{gameMessage}</h2>
        {gameState.gameStatus === GAME_STATUS.PLAYING && (
          <div className={css.currentPlayer}>
            Current Player: <span className={css.playerSymbol}>{gameState.currentPlayer}</span>
          </div>
        )}
      </div>

      <div className={css.board}>
        <div className={css.boardGrid}>
          {renderBlocks()}
        </div>
      </div>

      {gameState.gameStatus === GAME_STATUS.FINISHED && (
        <div className={css.gameOver}>
          <button
            className={css.resetButton}
            onClick={resetGame}
            aria-label="Start a new game"
          >
            {MESSAGES.PLAY_AGAIN}
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
