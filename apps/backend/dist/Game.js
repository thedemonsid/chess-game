"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
// A current or past game of chess
class Game {
    constructor(whitePlayer, blackPlayer) {
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.chess = new chess_js_1.Chess();
    }
    // Check if a player is in the game
    hasPlayer(player) {
        return player === this.whitePlayer || player === this.blackPlayer;
    }
    // Handle a move from a player
    handleMove(player, move) {
        if (player === this.whitePlayer) {
            if (this.chess.turn() === "w") {
                this.chess.move(move);
                this.blackPlayer.send(JSON.stringify({ type: messages_1.MOVE, move }));
            }
            else {
                this.whitePlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
                this.blackPlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
            }
        }
        else if (player === this.blackPlayer) {
            if (this.chess.turn() === "b") {
                this.chess.move(move);
                this.whitePlayer.send(JSON.stringify({ type: messages_1.MOVE, move }));
            }
            else {
                this.whitePlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
                this.blackPlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
            }
        }
    }
    // Handle a player disconnecting
    handleDisconnect(player) {
        if (player === this.whitePlayer) {
            this.blackPlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
        }
        else if (player === this.blackPlayer) {
            this.whitePlayer.send(JSON.stringify({ type: messages_1.DISCONNECT }));
        }
    }
}
exports.Game = Game;
