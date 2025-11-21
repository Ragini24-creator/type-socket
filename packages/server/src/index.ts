import  WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection",(ws)=>{
  console.log("Client connected")

  ws.on("message",(data)=>{
    const text = data.toString()
    console.log(text)
    ws.send(JSON.stringify({type:"echo", text}))
  });
});


console.log("ws running on port 8080")