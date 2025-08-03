import type { Players, GameResults, GameStatuses, BoardConfig, Animations, Messages } from './types';

/**
 * Game player symbols
 */
export const PLAYERS: Players = {
  X: "X",
  O: "O",
} as const;

/**
 * Game result types
 */
export const GAME_RESULTS: GameResults = {
  X_WINS: "X",
  O_WINS: "O",
  TIE: "Tie",
  IN_PROGRESS: null,
} as const;

/**
 * Game status types
 */
export const GAME_STATUS: GameStatuses = {
  PLAYING: "playing",
  FINISHED: "finished",
} as const;

/**
 * Winning combinations for the game board
 * Each array represents the indices of a winning line
 */
export const WINNING_COMBINATIONS: readonly (readonly number[])[] = [
  // Horizontal lines
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical lines
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal lines
  [0, 4, 8],
  [2, 4, 6],
] as const;

/**
 * Board configuration
 */
export const BOARD_CONFIG: BoardConfig = {
  SIZE: 9,
  ROWS: 3,
  COLS: 3,
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATIONS: Animations = {
  BLOCK_HOVER: 150,
  GAME_OVER: 500,
  RESET: 300,
} as const;

/**
 * Game messages
 */
export const MESSAGES: Messages = {
  X_TURN: "Player X's turn",
  O_TURN: "Player O's turn",
  X_WINS: "Player X wins! 🎉",
  O_WINS: "Player O wins! 🎉",
  TIE: "It's a tie! 🤝",
  PLAY_AGAIN: "Play Again",
} as const; 