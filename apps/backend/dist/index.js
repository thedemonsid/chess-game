"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const messages_1 = require("./messages");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager();
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        const message = JSON.parse(data.toString());
        if (message.type === messages_1.INIT_GAME) {
            gameManager.addPlayer(ws);
        }
        else if (message.type === messages_1.MOVE) {
            gameManager.handleMove(ws, message.move);
        }
    });
    ws.on("close", function close() {
        gameManager.handleDisconnect(ws);
    });
});
