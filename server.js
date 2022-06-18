const express = require('express');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

console.log(uuidv4());

const app = express();
const PORT = 3001;

let db = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));

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
  const noteSaved = req.body;
  noteSaved.id = uuidv4();
  console.log(req.body)
  db.push(noteSaved);

  fs.writeFileSync('db/db.json', JSON.stringify(db));
  res.send(noteSaved);
  
});

app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);