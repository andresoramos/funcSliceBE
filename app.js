var cors = require("cors");
// const WebsSocket = require('ws');
// const SocketServer = require('ws').Server;
const {websocketSend, getWebSocketSend} = require('./webSocket/socket')
const zmq = require('zeromq');
const express = require("express");
const config = require("config");
const db = config.get("db")
const loadAllRoutes = require("./server/startup/routes");
// const { dbStartUp } = require("./server/startup/db");
const app = express();
app.use(cors());
require("./server/db/dbConnection")
loadAllRoutes(app);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
  });
  
  const port = process.env.PORT || config.get("port");
  
  const server = app.listen(port, () => {
    console.log(`We're listening in on ${port}...`);
  });
  
  websocketSend(server);

  // setInterval(()=>{
  //   if(ws){
  //     ws.send("The message")
  //   }
  // }, 1000)
  // const wss = new SocketServer({server});
  // wss.on('connection', (ws)=>{
    //   console.log("client was connected");
    //   ws.on('close', ()=>{
      //     console.log("client closed")
      //   })
      //   ws.on('message', ()=>{
        //     console.log("client closed")
        //   })
        // setInterval(()=>{sendToClient("Hi there")}, 1000);
        
        // })
        
        