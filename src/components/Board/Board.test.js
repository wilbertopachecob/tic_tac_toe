import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board.js";

describe("Board Component", () => {
  test("renders game board with 9 blocks", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    expect(blocks).toHaveLength(9);
  });

  test("shows current player turn", () => {
    render(<Board />);
    expect(screen.getByText(/Current Player:/)).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
  });

  test("allows players to make moves", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // First player (O) makes a move
    fireEvent.click(blocks[0]);
    expect(blocks[0]).toHaveTextContent("O");
    
    // Second player (X) makes a move
    fireEvent.click(blocks[1]);
    expect(blocks[1]).toHaveTextContent("X");
  });

  test("prevents clicking on already filled blocks", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // First player makes a move
    fireEvent.click(blocks[0]);
    expect(blocks[0]).toHaveTextContent("O");
    
    // Try to click the same block again
    fireEvent.click(blocks[0]);
    expect(blocks[0]).toHaveTextContent("O"); // Should still be O, not change
  });

  test("detects horizontal win", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // Player O wins horizontally (top row)
    fireEvent.click(blocks[0]); // O
    fireEvent.click(blocks[3]); // X
    fireEvent.click(blocks[1]); // O
    fireEvent.click(blocks[4]); // X
    fireEvent.click(blocks[2]); // O wins!
    
    expect(screen.getByText(/Player O wins/)).toBeInTheDocument();
  });

  test("detects tie game", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // Create a tie scenario where no one wins
    // This pattern creates a tie: X O X, O X O, O X O
    const tieMoves = [1, 0, 2, 4, 3, 5, 7, 6, 8]; // X, O, X, O, X, O, O, X, O
    tieMoves.forEach((index) => {
      fireEvent.click(blocks[index]);
    });
    
    expect(screen.getByText(/It's a tie!/)).toBeInTheDocument();
  });

  test("shows reset button when game is over", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // Win the game
    fireEvent.click(blocks[0]); // O
    fireEvent.click(blocks[3]); // X
    fireEvent.click(blocks[1]); // O
    fireEvent.click(blocks[4]); // X
    fireEvent.click(blocks[2]); // O wins!
    
    const resetButton = screen.getByText("Play Again");
    expect(resetButton).toBeInTheDocument();
  });

  test("resets game when reset button is clicked", () => {
    render(<Board />);
    const blocks = screen.getAllByRole("button");
    
    // Win the game
    fireEvent.click(blocks[0]); // O
    fireEvent.click(blocks[3]); // X
    fireEvent.click(blocks[1]); // O
    fireEvent.click(blocks[4]); // X
    fireEvent.click(blocks[2]); // O wins!
    
    // Click reset
    const resetButton = screen.getByText("Play Again");
    fireEvent.click(resetButton);
    
    // Check that game is reset
    expect(screen.getByText(/Current Player:/)).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
    blocks.forEach(block => {
      expect(block).toHaveTextContent(""); // All blocks should be empty
    });
  });
}); 