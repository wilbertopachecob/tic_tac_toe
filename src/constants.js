/**
 * Game player symbols
 */
export const PLAYERS = {
  X: "X",
  O: "O",
};

/**
 * Game result types
 */
export const GAME_RESULTS = {
  X_WINS: "X",
  O_WINS: "O",
  TIE: "Tie",
  IN_PROGRESS: null,
};

/**
 * Game status types
 */
export const GAME_STATUS = {
  PLAYING: "playing",
  FINISHED: "finished",
};

/**
 * Winning combinations for the game board
 * Each array represents the indices of a winning line
 */
export const WINNING_COMBINATIONS = [
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
];

/**
 * Board configuration
 */
export const BOARD_CONFIG = {
  SIZE: 9,
  ROWS: 3,
  COLS: 3,
};

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATIONS = {
  BLOCK_HOVER: 150,
  GAME_OVER: 500,
  RESET: 300,
};

/**
 * Game messages
 */
export const MESSAGES = {
  X_TURN: "Player X's turn",
  O_TURN: "Player O's turn",
  X_WINS: "Player X wins! 🎉",
  O_WINS: "Player O wins! 🎉",
  TIE: "It's a tie! 🤝",
  PLAY_AGAIN: "Play Again",
};
