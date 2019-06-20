const express = require('express')
const app = express()
var http = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(http);
var cors = require('cors')

app.use(cors());

const ideas = [
  {
    id: 1,
    idea: "Car Insurance",
    voteUp: 0,
    voteDown: 0
  },
  {
    id: 2,
    idea: "Car Share",
    voteUp: 0,
    voteDown: 0
  },
  {
    id: 3,
    idea: "Travel Insurance",
    voteUp: 0,
    voteDown: 0
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
  socket.emit('votes-updated', ideas);
  socket.on('vote-sent', (vote) => {
    ideas = ideas.map((v) => {
      if (vote.id === v.id) {
        return {
          ...v,
          voteUp: vote.point > 0 ? v.voteUp++ : v.voteUp,
          voteDown: vote.point < 0 ? v.voteDown++ : v.voteDown
        }
      }
      return v;
    })
    console.log(ideas);
    io.emit('votes-updated', ideas);
  });
});



http.listen(port, () => console.log(`Example app listening on port ${port}!`))