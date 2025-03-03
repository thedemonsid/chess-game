import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { DISCONNECT, INVALID_MOVE, MOVE, WRONG_TURN } from "./messages";

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

  // Get opponent of a player
  private getOpponent(player: WebSocket): WebSocket | null {
    if (player === this.whitePlayer) return this.blackPlayer;
    if (player === this.blackPlayer) return this.whitePlayer;
    return null;
  }

  // Get expected turn color for a player
  private getPlayerColor(player: WebSocket): "w" | "b" | null {
    if (player === this.whitePlayer) return "w";
    if (player === this.blackPlayer) return "b";
    return null;
  }

  // Send a message to a player
  private sendMessage(player: WebSocket, type: string, payload?: any) {
    player.send(JSON.stringify({ type, ...payload }));
  }

  // Handle a move from a player
  handleMove(player: WebSocket, move: { from: string; to: string }) {
    const playerColor = this.getPlayerColor(player);
    const opponent = this.getOpponent(player);

    if (!playerColor || !opponent) return;

    // Check if it's this player's turn
    if (this.chess.turn() !== playerColor) {
      this.sendMessage(player, WRONG_TURN, { message: "Not your turn" });
      return;
    }

    try {
      this.chess.move(move);
      //* Send move to opponent
      this.sendMessage(opponent, MOVE, { move });
    } catch (error) {
      this.sendMessage(player, INVALID_MOVE, { message: "An error occurred" });
    }
  }

  //* Handle a player disconnecting
  handleDisconnect(player: WebSocket) {
    const opponent = this.getOpponent(player);
    if (opponent) {
      this.sendMessage(opponent, DISCONNECT);
    }
  }
}
