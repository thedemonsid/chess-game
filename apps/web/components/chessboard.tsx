"use client";
import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { cn } from "@/lib/utils";
// Pieces are defined as strings, where the first character is the color
// and the second character is the piece type.
const Pieces: { [key: string]: string } = {
  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚",
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",
};
// Position is a string that represents the position on the board.
// The first character is the column, and the second character is the row.
// For example, "a1" is the bottom left corner of the board.
// The board is 8x8, so the columns are "a" to "h" and the rows are 1 to 8.
const Square = ({
  color,
  piece,
  position,
  isSelected,
  onSelect,
  isPossibleMove,
}: {
  color: string;
  piece: string;
  position: string;
  isSelected: boolean;
  isPossibleMove?: boolean;
  onSelect: (position: string) => void;
}) => {
  const handleClick = () => {
    onSelect(position);
  };

  return (
    <div
      id={position}
      className={cn(
        "w-12 h-12 flex items-center justify-center text-3xl",
        color,
        isSelected ? "bg-green-500/60" : "",
        isPossibleMove ? "bg-green-500/60" : ""
      )}
      onClick={handleClick}
    >
      {piece}
    </div>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex">{children}</div>;
};

const Board = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Chessboard = () => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  // Use useRef to keep the chess instance between renders
  const chessRef = useRef<Chess>(new Chess());
  // Add state to force re-renders when the board changes
  const [boardState, setBoardState] = useState(chessRef.current.board());

  const handleSquareSelect = (position: string) => {
    // If the same position is clicked again, deselect it
    if (selectedPosition === position) {
      setSelectedPosition(null);
      setPossibleMoves([]);
    } else if (selectedPosition && possibleMoves.includes(position)) {
      // If the position is a possible move, make the move
      try {
        chessRef.current.move({ from: selectedPosition, to: position });
        // Update board state to trigger re-render
        setBoardState(chessRef.current.board());
        setSelectedPosition(null);
        setPossibleMoves([]);
      } catch (error) {
        console.error("Invalid move:", error);
      }
    } else {
      // Otherwise, select the new position
      setSelectedPosition(position);
      // Get the possible moves for the selected position
      try {
        const moves = chessRef.current.moves({ square: position as any });
        console.log("Possible moves:", moves);

        // Extract destination squares from move notation
        const destinations = moves.map((move) => move.match(/[a-h][1-8]/)?.[0] || "");
        console.log("Destinations:", destinations);

        setPossibleMoves(destinations);
      } catch (error) {
        console.error("Error getting moves:", error);
        setPossibleMoves([]);
      }
    }
  };

  return (
    <Board>
      {boardState.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((square, squareIndex) => {
            const position =
              String.fromCharCode(97 + squareIndex) + (8 - rowIndex);
            return (
              <Square
                key={squareIndex}
                color={
                  (rowIndex + squareIndex) % 2 === 0
                    ? "bg-green-900/60"
                    : "bg-green-100/10"
                }
                piece={square ? Pieces[`${square.color}${square.type}`] : ""}
                position={position}
                isPossibleMove={possibleMoves.includes(position)}
                isSelected={selectedPosition === position}
                onSelect={handleSquareSelect}
              />
            );
          })}
        </Row>
      ))}
    </Board>
  );
};

export default Chessboard;
