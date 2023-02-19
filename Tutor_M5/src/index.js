const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const songs = require("./songs");

// Routes
app.get('/ping', (req, res) => res.status(200).send('Pong!'));
app.use("/api/songs", songs);

app.listen(3000, () => console.log('Listening on port 3000'));