import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { DISCONNECT, MOVE } from "./messages";
// A current or past game of chess
export class Game {
  private whitePlayer: WebSocket;
  private blackPlayer: WebSocket;
  private chess: Chess;
  constructor(whitePlayer: WebSocket, blackPlayer: WebSocket) {
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;
    this.chess = new Chess();
  }
  // Check if a player is in the game
  hasPlayer(player: WebSocket) {
    return player === this.whitePlayer || player === this.blackPlayer;
  }
  // Handle a move from a player
  handleMove(player: WebSocket, move: { from: string; to: string }) {
    if (player === this.whitePlayer) {
      if (this.chess.turn() === "w") {
        this.chess.move(move);
        this.blackPlayer.send(JSON.stringify({ type: MOVE, move }));
      } else {
        this.whitePlayer.send(JSON.stringify({ type: DISCONNECT }));
        this.blackPlayer.send(JSON.stringify({ type: DISCONNECT }));
      }
    } else if (player === this.blackPlayer) {
      if (this.chess.turn() === "b") {
        this.chess.move(move);
        this.whitePlayer.send(JSON.stringify({ type: MOVE, move }));
      } else {
        this.whitePlayer.send(JSON.stringify({ type: DISCONNECT }));
        this.blackPlayer.send(JSON.stringify({ type: DISCONNECT }));
      }
    }
  }
  // Handle a player disconnecting
  handleDisconnect(player: WebSocket) {
    if (player === this.whitePlayer) {
      this.blackPlayer.send(JSON.stringify({ type: DISCONNECT }));
    } else if (player === this.blackPlayer) {
      this.whitePlayer.send(JSON.stringify({ type: DISCONNECT }));
    }
  }
}
