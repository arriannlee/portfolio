"use client";

import { useEffect, useState } from "react";
import "./Minesweeper.css";
import MinesweeperFace from "./MinesweeperFace";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

type GameStatus = "ready" | "playing" | "won" | "lost";

function createBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  );
}

function neighbours(row: number, col: number) {
  const cells: [number, number][] = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        cells.push([r, c]);
      }
    }
  }

  return cells;
}

function placeMines(
  board: Cell[][],
  safeRow: number,
  safeCol: number,
): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));

  // Protect the first clicked square.
  const available: [number, number][] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r !== safeRow || c !== safeCol) {
        available.push([r, c]);
      }
    }
  }

  // Shuffle available positions.
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [available[i], available[j]] = [available[j], available[i]];
  }

  available.slice(0, MINES).forEach(([r, c]) => {
    next[r][c].mine = true;
  });

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      next[r][c].adjacent = neighbours(r, c).filter(
        ([nr, nc]) => next[nr][nc].mine,
      ).length;
    }
  }

  return next;
}

function revealArea(board: Cell[][], row: number, col: number) {
  const queue: [number, number][] = [[row, col]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const cell = board[r][c];

    if (cell.revealed || cell.flagged || cell.mine) continue;

    cell.revealed = true;

    if (cell.adjacent === 0) {
      neighbours(r, c).forEach(([nr, nc]) => {
        if (!board[nr][nc].revealed && !board[nr][nc].flagged) {
          queue.push([nr, nc]);
        }
      });
    }
  }
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [seconds, setSeconds] = useState(0);

  const flags = board.flat().filter((cell) => cell.flagged).length;

  useEffect(() => {
    if (status !== "playing") return;

    const timer = window.setInterval(() => {
      setSeconds((current) => Math.min(current + 1, 999));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  function resetGame() {
    setBoard(createBoard());
    setStatus("ready");
    setSeconds(0);
  }

  function revealCell(row: number, col: number) {
    if (status === "won" || status === "lost") return;

    const selected = board[row][col];

    if (selected.revealed || selected.flagged) return;

    const next =
      status === "ready"
        ? placeMines(board, row, col)
        : board.map((r) => r.map((cell) => ({ ...cell })));

    if (next[row][col].mine) {
      next[row][col].revealed = true;

      next.forEach((r) =>
        r.forEach((cell) => {
          if (cell.mine) cell.revealed = true;
        }),
      );

      setBoard(next);
      setStatus("lost");
      return;
    }

    revealArea(next, row, col);

    const hasWon = next.flat().every((cell) => cell.mine || cell.revealed);

    setBoard(next);
    setStatus(hasWon ? "won" : "playing");
  }

  function toggleFlag(row: number, col: number) {
    if (status === "won" || status === "lost") return;

    const next = board.map((r) => r.map((cell) => ({ ...cell })));

    const cell = next[row][col];

    if (cell.revealed) return;

    if (!cell.flagged && flags >= MINES) return;

    cell.flagged = !cell.flagged;

    setBoard(next);
  }

  return (
    <div className="minesweeper">
      <div className="minesweeper-toolbar">
        <button type="button" onClick={resetGame}>
          Game
        </button>

        <span>Beginner</span>
      </div>

      <div className="minesweeper-panel">
        <div className="minesweeper-scoreboard">
          <div className="minesweeper-counter">
            {String(MINES - flags).padStart(3, "0")}
          </div>

          <button
            type="button"
            className="minesweeper-face"
            onClick={resetGame}
            aria-label="Start new game"
          >
            <MinesweeperFace status={status} />
          </button>

          <div className="minesweeper-counter">
            {String(seconds).padStart(3, "0")}
          </div>
        </div>

        <div
          className="minesweeper-grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 24px)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                className={`minesweeper-cell ${
                  cell.revealed ? "is-revealed" : ""
                } ${cell.mine && cell.revealed ? "is-mine" : ""}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  toggleFlag(rowIndex, colIndex);
                }}
                aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}${
                  cell.flagged ? ", flagged" : ""
                }`}
              >
                {cell.flagged
                  ? "🚩"
                  : cell.revealed && cell.mine
                    ? "💣"
                    : cell.revealed && cell.adjacent > 0
                      ? cell.adjacent
                      : ""}
              </button>
            )),
          )}
        </div>
      </div>

      <div className="minesweeper-status">
        {status === "won"
          ? "Congratulations! You cleared the minefield."
          : status === "lost"
            ? "Game over! Click the smiley face to try again."
            : "Find all the mines without triggering one."}
      </div>
    </div>
  );
}
