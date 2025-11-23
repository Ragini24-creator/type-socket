import  WebSocket, {WebSocketServer} from "ws";
import { Events } from "./core/types";
import { EventsRouter } from "./core/router";

const wss = new WebSocketServer({port:8080});

const router = new EventsRouter<Events>;

router.on("ping",(data,client)=>{
  console.log("Ping received");

  client.send("pong",data)
});

router.on("join_room",(data,client)=>{
  console.log("Join room");

  client.send("Joined a room",data)
})

wss.on("connection",(ws)=>{
  console.log("Client connected")

  ws.on("message",(rawData)=>{
    try{
     const {event,data} = JSON.parse(rawData.toString());

     router.handle(event as keyof Events ,data,ws);

    }catch(err){
      console.error("Invalid message received", rawData.toString());
    }

  });
});



console.log("ws running on port 8080")