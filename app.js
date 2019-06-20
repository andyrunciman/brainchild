const express = require('express')
const app = express()
var http = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(http);
var cors = require('cors')

app.use(cors());

const ideas = [
  {id:1,
  idea:"Car Insurance",
  voteUp:0,
  voteDown:0},
  {id:2,
    idea:"Car Share",
    voteUp:0,
    voteDown:0},
    {id:3,
      idea:"Travel Insurance",
      voteUp:0,
      voteDown:0}
]

app.get('/vote', function(req, res){
    res.sendFile(__dirname + '/vote.html');
  });

  app.get('/summary', function(req, res){
    res.sendFile(__dirname + '/summary.html');
  });

app.get('/ideas',(req,res)=>{
  res.json(ideas);
})

io.on('connection', function(socket){
  console.log('a user connected');
});
  


http.listen(port, () => console.log(`Example app listening on port ${port}!`))