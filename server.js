const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => res.send('Get Started'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(db)
);

app.post('/api/notes', (req, res) =>{
  console.log(req.body)
  res.send(req.body)
  db.push(req.body)
});

app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);