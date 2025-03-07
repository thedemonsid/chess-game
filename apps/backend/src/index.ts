import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { INIT_GAME, MOVE } from "./messages";

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    try {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        gameManager.addPlayer(ws);
      } else if (message.type === MOVE) {
        gameManager.handleMove(ws, message.move);
      }
    } catch (error) {
      console.error(error);
    }
  });
  ws.on("close", function close() {
    gameManager.handleDisconnect(ws);
  });
});
