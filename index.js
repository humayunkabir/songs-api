const express = require('express');
const Joi = require('joi');
const cors = require('cors');
const songs = require('./SongsDB.json');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());

app.get('/api/songs', (req, res) => res.send({ songs }));
app.get('/api/songs/:id', (req, res) => {
  const song = songs.find(s => s.id === parseInt(req.params.id));
  if (!song) {
    return res.send('The song, you are looking for is not found!');
  }
  res.send(song);
});

// app.get('/api/songs/:song_name', (req, res) => {
//   console.log(req.params.song_name);
//   const song = songs.find(s => s.song_name === req.params.song_name);
//   if (!song) {
//     return res.send('The song, you are looking for is not found!!');
//   }
//   res.send(song);
// });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Listening to the port ${port}...\nHit http://localhost:${port}/api/songs`
  )
);
