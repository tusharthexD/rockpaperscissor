import express from 'express'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Server } from 'socket.io'


const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static("public/"))
const rooms = []



io.on('connection', function(socket){


  socket.on('disconnect', ()=> {
 });

 socket.on("createGame", ()=>{
  const roomUniqueId = makeid(6)
  rooms[roomUniqueId] = {}
  socket.join(roomUniqueId)
  socket.emit("newGame", {roomUniqueId: roomUniqueId})
 })

 socket.on("joinGame", (data)=>{
 if(rooms[data.roomUniqueId] != null){
  socket.join(data.roomUniqueId)
  socket.to(data.roomUniqueId).emit("playersConnected", {})
  socket.emit("playersConnected")
 }
 })

 socket.on("p1choice", (data)=>{
  let rpsValue = data.rpsvalue;
  rooms[data.roomUniqueId].p1Choice = rpsValue;
    
  socket.to(data.roomUniqueId).emit("p1choice", data)
  socket.emit("p1choice", data)


  })


  socket.on("p2choice", (data)=>{
    let rpsValue = data.rpsvalue;
    rooms[data.roomUniqueId].p2Choice = rpsValue;


    socket.to(data.roomUniqueId).emit("p2choice", data)
    socket.emit("p2choice", data)
    })

// NAMESECTION  
socket.on("p1name", (data)=>{
  let playername = data.playername;
  rooms[data.roomUniqueId].p1Name = playername;
    
  socket.to(data.roomUniqueId).emit("p1name", data)
  socket.emit("p1name", data)

})

socket.on("p2name", (data)=>{
  let playername = data.playername;
  rooms[data.roomUniqueId].p2Name = playername;
    
  socket.to(data.roomUniqueId).emit("p2name", data)
  socket.emit("p2name", data)

  })  

  

})



function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



app.get('/', (req, res) =>{
     res.render("home.ejs")
    
})

app.get("/multiplayer", (req, res)=>{
  res.render("multy.ejs")
})

app.get("/PlaywithPc", (req, res)=>{
  res.render("game.ejs")
})

app.get('/multiplayer/:roomcode',(req, res)=> {
  res.render("multy.ejs", {roomcode: req.params.roomcode});
});
    server.listen(3000, () => {
        console.log('server running at http://localhost:3000');
      });