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
api.get('/users', (req, res) => {
  db.all('SELECT distinct f FROM callrecords', (err, rows) => {
    res.json(rows);
  });
});

/**
 * @api {get} /user_calls/:id Request list of calls of a user
 * @apiName GetUserCalls
 * @apiGroup User
 *
 * @apiParam {id} id User id
 *
 * @apiSuccess {Object[]} calls List of calls of specified user.
 * @apiSuccess {Number} users.f User id initiating the call (f stands for 'from')
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *            "f": 1,
 *            "t": 200,
 *            "ts": null,
 *           "duration": 1454,
 *           "cid": 29
 *       },
 *        {
 *            "f": 1,
 *            "t": 2,
 *            "ts": "2006-06-01 10:00:00",
 *            "duration": 897,
 *            "cid": 29
 *        },
 *     ]
 *
 * @apiError UserNotFound There is no user in the DB.
 *
 * @apiSampleRequest http://localhost:3000/user/:id
 *
 * @apiErrorExample {json} List error
 *   HTTP/1.1 500 Internal Server Error
 *
 */
api.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM callrecords where f=${id}`, (err, rows) => {
    res.json(rows);
  });
});


// start listening

const port = 3000;
api.listen(port);
console.log(`Listening on port ${port}...`);
