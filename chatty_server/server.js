const express = require('express');
const WebSocket = require ('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v1');
const randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
   .use(express.static('public'))
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//send connected client number to front end
const connectionOpen = num => {
  let clientNumber = {
    type: "userNumber",
    userCount: num,
  }
  wss.broadcast(JSON.stringify(clientNumber));
};



// assign color to every client online
const colorAssign = () => {
  let clientColor = {
    id: uuid(),
    type: "colorAssign",
    userColor: randomColor()
  }
  wss.broadcast(JSON.stringify(clientColor));
};


wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN){
      client.send(data);
    }
  });
}

wss.on('connection', (ws) => {
  const number = wss.clients.size
  colorAssign();
  connectionOpen(number);

  ws.on('message', (data) => {
    console.log("server on message: ",data)
    wss.broadcast(data, ws);

  })

  ws.on('close', () => {
   console.log('Client disconnected');
   connectionOpen(wss.clients.size);

 })


});