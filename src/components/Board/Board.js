import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
  moveCount: 0,
};

/**
 * Board component - Main game container
 * @returns {JSX.Element} Board component
 */
const Board = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const gameStatusRef = useRef(null);
  const boardRef = useRef(null);

  // Announce game status changes to screen readers
  useEffect(() => {
    if (gameStatusRef.current) {
      gameStatusRef.current.focus();
    }
  }, [gameState.gameStatus, gameState.winner]);

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
        moveCount: prev.moveCount + 1,
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
        moveCount: prev.moveCount + 1,
      }));
      return;
    }

    // Continue game
    setGameState(prev => ({
      ...prev,
      blocks: newBlocks,
      currentPlayer: prev.currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
      moveCount: prev.moveCount + 1,
    }));
  }, [gameState, checkWin, checkTie]);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    // Focus the first block after reset for better accessibility
    setTimeout(() => {
      const firstBlock = boardRef.current?.querySelector('[role="button"]');
      if (firstBlock) {
        firstBlock.focus();
      }
    }, 100);
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
   * Get detailed game status for screen readers
   */
  const getDetailedGameStatus = useMemo(() => {
    const filledBlocks = gameState.blocks.filter(block => block !== null).length;
    const remainingBlocks = BOARD_CONFIG.SIZE - filledBlocks;
    
    if (gameState.gameStatus === GAME_STATUS.FINISHED) {
      if (gameState.winner === GAME_RESULTS.TIE) {
        return `Game ended in a tie after ${gameState.moveCount} moves. All 9 squares are filled.`;
      } else {
        return `Game won by player ${gameState.winner} after ${gameState.moveCount} moves.`;
      }
    }
    
    return `Game in progress. ${filledBlocks} squares filled, ${remainingBlocks} squares remaining. Current player: ${gameState.currentPlayer}.`;
  }, [gameState.gameStatus, gameState.winner, gameState.blocks, gameState.currentPlayer, gameState.moveCount]);

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
        disabled={gameState.gameStatus === GAME_STATUS.FINISHED}
      />
    ));
  };

  return (
    <div 
      className={css.boardContainer}
      role="main"
      aria-labelledby="game-title"
      aria-describedby="game-status"
    >
      {/* Hidden title for screen readers */}
      <h1 id="game-title" className="sr-only">Tic Tac Toe Game</h1>
      
      {/* Live region for game status announcements */}
      <div
        ref={gameStatusRef}
        id="game-status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        tabIndex="-1"
      >
        {getDetailedGameStatus}
      </div>

      <div className={css.gameInfo}>
        <h2 
          className={css.gameMessage}
          aria-live="polite"
          aria-atomic="true"
        >
          {gameMessage}
        </h2>
        {gameState.gameStatus === GAME_STATUS.PLAYING && (
          <div className={css.currentPlayer}>
            Current Player: <span className={css.playerSymbol}>{gameState.currentPlayer}</span>
          </div>
        )}
      </div>

      <div 
        className={css.board}
        ref={boardRef}
        role="application"
        aria-label="Tic Tac Toe game board"
        aria-describedby="game-instructions"
      >
        {/* Hidden instructions for screen readers */}
        <div id="game-instructions" className="sr-only">
          Tic Tac Toe game board with 9 squares arranged in a 3 by 3 grid. 
          Click on any empty square to place your mark. 
          Get three of your marks in a row horizontally, vertically, or diagonally to win.
        </div>
        
        <div 
          className={css.boardGrid}
          role="grid"
          aria-label="Game board grid"
        >
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
