// create a connector to access the database
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data/vc2008.db');

// initialize express
const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());


/**
 * @api {get} /users Request list of users initiating a call
 * @apiName GetUserIDList
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of objects with user IDs.
 * @apiSuccess {Number} users.f User id initiating the call (f stands for 'from')
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {"f": 0},
 *       {"f": 1},
 *       {"f": 2},
 *     ]
 *
 * @apiError UserNotFound There is no user in the DB.
 *
 * @apiSampleRequest http://localhost:3000/users
 *
 *  @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
// define a simple entry point to retrieve all users
api.get('/users', (req, res) => {
  db.all('SELECT distinct f FROM callrecords', (err, rows) => {
    res.json(rows);
  });
});


// start listening
api.listen(3000);
console.log('Listening on port 3000...');
