import React from "react";
import type { AppProps } from "@/types";
import "./App.css";
import Board from "@/components/Board/Board";

/**
 * Main App component
 * @param props - Component props
 * @returns App component
 */
const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-badge" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
            <path d="M5 5 L14 14 M14 5 L5 14" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="21.5" cy="21.5" r="6" stroke="var(--secondary-color)" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <h1 className="App-title">Tic Tac Toe</h1>
        <p className="App-subtitle">Three in a row, after dark.</p>
      </header>
      <main className="App-main">
        <Board />
      </main>
    </div>
  );
};

export default App; 