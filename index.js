// create a connector to access the database
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data/vc2008.db');

// initialize express
const express = require('express');

const api = express();


// define a simple entry point to retrieve all users
api.get('/users', (req, res) => {
  db.all('SELECT distinct f FROM callrecords', (err, rows) => {
    res.json(rows);
  });
});


// start listening
api.listen(3000);
console.log('Listening on port 3000...');
