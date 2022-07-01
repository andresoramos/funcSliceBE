const { set } = require('lodash');

const SocketServer = require('ws').Server;

let sendSocketMessage;

const websocketSend = (server)=>{
    const wss = new SocketServer({server});
    wss.on('connection', (ws)=>{
      console.log("client was connected");
      sendSocketMessage = ws;
      console.log("ws set")
      ws.on('close', ()=>{
        console.log("client closed")
      })
      ws.on('message', ()=>{
        console.log("client closed")
      })

    })
    console.log("should be after connection")
}

const getWebSocketSend = async()=>{
    return new Promise((resolve)=>{
        let token = setInterval(()=>{
            if(sendSocketMessage){
                console.log("There is a thing happening")
                clearInterval(token);
                return resolve(sendSocketMessage);
            }
        }, 500)

    })
}

const sendSocketUpdate = async(message)=>{
    const ws = await getWebSocketSend();
    console.log("This happens many ties")
    ws.send(message)
}



module.exports = {websocketSend, sendSocketUpdate, getWebSocketSend};