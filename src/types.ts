/**
 * TypeScript type definitions for the Tic Tac Toe game
 */

// Game player types
export type Player = 'X' | 'O';

// Game result types
export type GameResult = 'X' | 'O' | 'Tie' | null;

// Game status types
export type GameStatus = 'playing' | 'finished';

// Block value types
export type BlockValue = Player | null;

// Game state interface
export interface GameState {
  blocks: BlockValue[];
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: GameResult;
  winningBlocks: readonly number[];
  moveCount: number;
}

// Block component props interface
export interface BlockProps {
  value: BlockValue;
  onClick: () => void;
  isWinningBlock?: boolean;
  index: number;
  disabled?: boolean;
}

// Board component props interface
export interface BoardProps {
  // Currently no props needed, but keeping for future extensibility
}

// App component props interface
export interface AppProps {
  // Currently no props needed, but keeping for future extensibility
}

// Utility function types
export type ClassNamesFunction = (...classes: (string | undefined | null | false)[]) => string;
export type AllEqualFunction = <T>(array: T[], value: T) => boolean;
export type DeepCopyFunction = <T>(array: T[]) => T[];
export type DelayFunction = (ms: number) => Promise<void>;

// Constants types
export interface Players {
  X: 'X';
  O: 'O';
}

export interface GameResults {
  X_WINS: 'X';
  O_WINS: 'O';
  TIE: 'Tie';
  IN_PROGRESS: null;
}

export interface GameStatuses {
  PLAYING: 'playing';
  FINISHED: 'finished';
}

export interface BoardConfig {
  SIZE: number;
  ROWS: number;
  COLS: number;
}

export interface Animations {
  BLOCK_HOVER: number;
  GAME_OVER: number;
  RESET: number;
}

export interface Messages {
  X_TURN: string;
  O_TURN: string;
  X_WINS: string;
  O_WINS: string;
  TIE: string;
  PLAY_AGAIN: string;
}

// Winning combination type
export type WinningCombination = readonly number[];

// CSS module types
export interface CSSModule {
  [key: string]: string;
} 