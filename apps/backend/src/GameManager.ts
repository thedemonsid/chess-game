import { WebSocket } from "ws";
import { Game } from "./Game";
// A chess game

export class GameManager {
  private pendingPlayer: WebSocket | null;
  private games: Game[];
  constructor() {
    this.pendingPlayer = null;
    this.games = [];
  }

  // Handle a player connecting
  addPlayer(player: WebSocket) {
    if (this.pendingPlayer === null) {
      this.pendingPlayer = player;
      player.send(
        JSON.stringify({ type: "WAITING", message: "Waiting for opponent" })
      );
    } else {
      const game = new Game(this.pendingPlayer, player);
      this.games.push(game);

      this.pendingPlayer.send(
        JSON.stringify({ type: "GAME_START", message: "Game starting" })
      );
      player.send(
        JSON.stringify({ type: "GAME_START", message: "Game starting" })
      );
      this.pendingPlayer = null;
    }
  }
  handleMove(player: WebSocket, move: { from: string; to: string }) {
    const game = this.games.find((game) => game.hasPlayer(player));
    if (game) {
      game.handleMove(player, move);
    }
  }
  handleDisconnect(player: WebSocket) {
    const game = this.games.find((game) => game.hasPlayer(player));
    if (game) {
      game.handleDisconnect(player);
      this.games = this.games.filter((game) => !game.hasPlayer(player));
    }
  }
}
