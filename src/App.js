import React from "react";
import "./App.css";
import Board from "components/Board/Board.js";

/**
 * Main App component
 * @returns {JSX.Element} App component
 */
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">🎮 Tic Tac Toe</h1>
        <p className="App-subtitle">A modern React game</p>
      </header>
      <main className="App-main">
        <Board />
      </main>
      <footer className="App-footer">
        <p>Built with React and modern web technologies</p>
      </footer>
    </div>
  );
};

export default App;
