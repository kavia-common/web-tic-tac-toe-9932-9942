import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Neon Cyber Tic Tac Toe
 * - Dark background (#0F172A) with neon accents
 * - Primary neon green (#10B981), Secondary yellow (#F59E0B)
 * - Bold typography, rounded corners, high-contrast elements
 * - Centered 3x3 grid, player indicators above, controls/status below
 */

// Types
const X = 'X';
const O = 'O';
const EMPTY_BOARD = Array(9).fill(null);

// Helpers
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diags
];

/**
 * Determine if there is a winner on the board.
 * @param {Array<string|null>} board 1D array of length 9
 * @returns {{player: 'X'|'O'|null, line: number[]|null}}
 */
function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return { player: null, line: null };
}

/**
 * Determine if the board is full.
 * @param {Array<string|null>} board
 * @returns {boolean}
 */
function isBoardFull(board) {
  return board.every((c) => c !== null);
}

/**
 * Compute next player by parity of non-null cells.
 * @param {Array<string|null>} board
 * @returns {'X'|'O'}
 */
function nextPlayer(board) {
  const moves = board.filter(Boolean).length;
  return moves % 2 === 0 ? X : O;
}

/**
 * Derive status message and color state.
 * @param {Array<string|null>} board
 * @returns {{label: string, tone: 'play'|'win'|'tie', winner: string|null}}
 */
function getStatus(board) {
  const { player: winner } = getWinner(board);
  if (winner) {
    return { label: `Winner: ${winner}`, tone: 'win', winner };
  }
  if (isBoardFull(board)) {
    return { label: "It's a tie!", tone: 'tie', winner: null };
  }
  return { label: `Current Turn: ${nextPlayer(board)}`, tone: 'play', winner: null };
}

/**
 * Square component renders a single cell.
 * PUBLIC_INTERFACE
 */
function Square({ value, onClick, highlight }) {
  /** A neon cyber square */
  return (
    <button
      className={`ttt-square ${highlight ? 'highlight' : ''} ${
        value === X ? 'xmark' : value === O ? 'omark' : ''
      }`}
      onClick={onClick}
      aria-label={`Board square ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}

/**
 * Board component renders the 3x3 grid.
 * PUBLIC_INTERFACE
 */
function Board({ board, winningLine, onSquareClick }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((val, idx) => {
        const isWinCell = winningLine?.includes(idx);
        return (
          <Square
            key={idx}
            value={val}
            onClick={() => onSquareClick(idx)}
            highlight={!!isWinCell}
          />
        );
      })}
    </div>
  );
}

/**
 * PlayerIndicator shows two badges for current player highlighting.
 * PUBLIC_INTERFACE
 */
function PlayerIndicator({ current, winner }) {
  return (
    <div className="player-indicator" aria-live="polite">
      <div className={`badge ${current === X ? 'active' : ''} ${winner === X ? 'win' : ''}`}>
        <span className="symbol">X</span>
        <span className="label">Player X</span>
      </div>
      <div className={`badge ${current === O ? 'active' : ''} ${winner === O ? 'win' : ''}`}>
        <span className="symbol">O</span>
        <span className="label">Player O</span>
      </div>
    </div>
  );
}

/**
 * Controls area: Reset and Undo.
 * PUBLIC_INTERFACE
 */
function Controls({ onReset, onUndo, canUndo, disabled }) {
  return (
    <div className="controls">
      <button className="btn primary" onClick={onReset} disabled={disabled}>
        Reset
      </button>
      <button className="btn secondary" onClick={onUndo} disabled={!canUndo || disabled}>
        Undo
      </button>
    </div>
  );
}

/**
 * Status bar with dynamic tone and message.
 * PUBLIC_INTERFACE
 */
function StatusBar({ message, tone }) {
  return (
    <div className={`status ${tone}`}>
      <span>{message}</span>
    </div>
  );
}

/**
 * Main App for Neon Cyber Tic Tac Toe.
 * PUBLIC_INTERFACE
 */
function App() {
  // State includes history for simple undo
  const [history, setHistory] = useState([EMPTY_BOARD]);
  const board = history[history.length - 1];

  const { player: winner, line: winningLine } = useMemo(() => getWinner(board), [board]);
  const current = useMemo(() => nextPlayer(board), [board]);
  const status = useMemo(() => getStatus(board), [board]);

  const gameOver = !!winner || isBoardFull(board);

  const handleSquareClick = (idx) => {
    if (board[idx] || winner || gameOver) return;
    const next = board.slice();
    next[idx] = current;
    setHistory((h) => [...h, next]);
  };

  const handleReset = () => {
    setHistory([EMPTY_BOARD]);
  };

  const handleUndo = () => {
    setHistory((h) => (h.length > 1 ? h.slice(0, h.length - 1) : h));
  };

  return (
    <div className="neon-app">
      <div className="container">
        <header className="header">
          <h1 className="title">Neon Cyber Tic Tac Toe</h1>
          <p className="subtitle">Defy the grid. Claim the glow.</p>
        </header>

        <PlayerIndicator current={current} winner={winner} />

        <main className="board-wrap">
          <Board board={board} winningLine={winningLine} onSquareClick={handleSquareClick} />
        </main>

        <StatusBar message={status.label} tone={status.tone} />

        <Controls
          onReset={handleReset}
          onUndo={handleUndo}
          canUndo={history.length > 1}
          disabled={false}
        />

        <footer className="footer">
          <span className="hint">
            Tip: Click an empty square to place your mark. X always starts.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
