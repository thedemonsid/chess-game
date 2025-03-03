"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
// A chess game
class GameManager {
    constructor() {
        this.pendingPlayer = null;
        this.games = [];
    }
    // Handle a player connecting
    addPlayer(player) {
        if (this.pendingPlayer === null) {
            this.pendingPlayer = player;
            player.send(JSON.stringify({ type: "WAITING", message: "Waiting for opponent" }));
        }
        else {
            const game = new Game_1.Game(this.pendingPlayer, player);
            this.games.push(game);
            this.pendingPlayer.send(JSON.stringify({ type: "GAME_START", message: "Game starting" }));
            player.send(JSON.stringify({ type: "GAME_START", message: "Game starting" }));
            this.pendingPlayer = null;
        }
    }
    handleMove(player, move) {
        const game = this.games.find((game) => game.hasPlayer(player));
        if (game) {
            game.handleMove(player, move);
        }
    }
    handleDisconnect(player) {
        const game = this.games.find((game) => game.hasPlayer(player));
        if (game) {
            game.handleDisconnect(player);
            this.games = this.games.filter((game) => !game.hasPlayer(player));
        }
    }
}
exports.GameManager = GameManager;
