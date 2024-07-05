import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();
  const sessions: any = {};

  io.bind(engine);

  io.on("connection", (socket) => {
    socket.on('message', (message) => {
        const data = JSON.parse(message);
  
        switch (data.type) {
          case 'register':
            console.log("register")
            if (!sessions[data.gameId]) {
              sessions[data.gameId] = {};
            }
            sessions[data.gameId][data.id] = { io, name: data.name, isGameMaster: data.isGameMaster };
            broadcastPlayerList(data.gameId);
            break;
          case 'buttonPress':
            console.log("buttonPress")
            broadcastToOthers(data.gameId, JSON.stringify({ type: 'buttonPress', id: data.id, name: data.name, button: data.button }));
            break;
          case 'startGame':
            console.log("startGame")
            broadcastToAll(data.gameId, JSON.stringify({ type: 'startGame', gameId: data.gameId }));
            break;
            case 'reponse':
                broadcastToAll(data.gameId, JSON.stringify({ type: 'reponse', gameId: data.gameId, reponse: data.reponse }));
                break;  
          case 'nextQuestion':
            broadcastToAll(data.gameId, JSON.stringify({ type: 'nextQuestion' }));
            break;
            case 'stopTimer':
                broadcastToAll(data.gameId, JSON.stringify({ type: 'stopTimer' }));
                break;
                case 'startTimer':
                    broadcastToAll(data.gameId, JSON.stringify({ type: 'startTimer' }));
                    break;       
        }
      });  
  });

  function broadcastToOthers(gameId: string, message: string) {
    console.log("toto", gameId, message)
    Object.values(sessions[gameId]).forEach(player => {
        io.emit("btnClicked", message);
    });
  }

  function broadcastToAll(gameId: string, message: string) {
    Object.values(sessions[gameId]).forEach(player => {
      io.emit("message", message);
    });
  }

  function broadcastPlayerList(gameId: string) {
    const players = Object.values(sessions[gameId]).map(player => ({ name: player.name, isGameMaster: player.isGameMaster }));
    broadcastToAll(gameId, JSON.stringify({ type: 'playerList', players }));
  }

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});