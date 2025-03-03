import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, WAITING } from "./messages";

export class GameManager {
  private pendingPlayer: WebSocket | null;
  private games: Game[];

  constructor() {
    this.pendingPlayer = null;
    this.games = [];
  }

  // Send a message to a player
  private sendMessage(player: WebSocket, type: string, message?: string) {
    player.send(JSON.stringify({ type, message }));
  }

  // Find game containing a player
  private findPlayerGame(player: WebSocket): Game | undefined {
    return this.games.find((game) => game.hasPlayer(player));
  }

  // Handle a player connecting
  addPlayer(player: WebSocket) {
    if (this.pendingPlayer === null) {
      this.pendingPlayer = player;
      this.sendMessage(player, WAITING, "Waiting for opponent");
    } else {
      const game = new Game(this.pendingPlayer, player);
      this.games.push(game);

      // Notify both players that game is starting
      this.sendMessage(
        this.pendingPlayer,
        INIT_GAME,
        "Game starting,YOU ARE WHITE"
      );
      this.sendMessage(player, INIT_GAME, "Game starting,YOU ARE BLACK");

      this.pendingPlayer = null;
    }
  }

  handleMove(player: WebSocket, move: { from: string; to: string }) {
    const game = this.findPlayerGame(player);
    if (game) {
      game.handleMove(player, move);
    }
  }

  handleDisconnect(player: WebSocket) {
    const game = this.findPlayerGame(player);
    if (game) {
      game.handleDisconnect(player);
      this.games = this.games.filter((g) => !g.hasPlayer(player));
    }

    // Also handle pending player disconnection
    if (this.pendingPlayer === player) {
      this.pendingPlayer = null;
    }
  }
}
