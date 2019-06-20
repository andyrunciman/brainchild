const express = require('express')
const app = express()
var http = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(http);
var cors = require('cors')

app.use(cors());

let ideas = [
  {
    id: 1,
    idea: "Car Insurance",
    voteUp: 1,
    voteDown: 1
  },
  {
    id: 2,
    idea: "Car Share",
    voteUp: 1,
    voteDown: 1
  },
  {
    id: 3,
    idea: "Travel Insurance",
    voteUp: 1,
    voteDown: 1
  }
]

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/vote', function (req, res) {
  res.sendFile(__dirname + '/vote.html');
});

app.get('/summary', function (req, res) {
  res.sendFile(__dirname + '/summary.html');
});

app.get('/ideas', (req, res) => {
  res.json(ideas);
})

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('init', ideas);
  socket.on('vote-sent', (vote) => {
    ideas = ideas.map((v) => {
      if (vote.id === v.id) {
        let e = {
          ...v,
          voteUp: vote.point > 0 ? v.voteUp + 1 : v.voteUp,
          voteDown: vote.point < 0 ? v.voteDown - 1 : v.voteDown
        }
        return e;
      }
      return v;
    })
    // console.log(ideas);
    io.emit('votes-updated', ideas);
  });
});



http.listen(port, () => console.log(`Example app listening on port ${port}!`))