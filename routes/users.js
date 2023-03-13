// routes/users.js
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const client = require('../db');
// GET all users
router.get('/', async (req, res) => {
  const users = await client.db("mydb").collection('users').find().toArray();
  res.json(users);
});

// POST a new user
router.post('/', async (req, res) => {
  const newUser = req.body;
  const result = await client.db("mydb").collection('users').insertOne(newUser);
  if (result.acknowledged) {
    res.json(newUser);
  } else {
    res.status(400).send('Failed to insert user');
  }
});

// GET a user by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.collection('users').findOne({ _id: ObjectID(id) }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else if (!result) {
      res.status(404).send({ error: `User with ID ${id} not found` });
    } else {
      res.send(result);
    }
  });
});

// PUT a user by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;

  db.collection('users').updateOne({ _id: ObjectID(id) }, { $set: req.body }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else if (result.matchedCount === 0) {
      res.status(404).send({ error: `User with ID ${id} not found` });
    } else {
      res.send(`User with ID ${id} updated`);
    }
  });
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.collection('users').deleteOne({ _id: ObjectID(id) }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else if (result.deletedCount === 0) {
      res.status(404).send({ error: `User with ID ${id} not found` });
    } else {
      res.send(`User with ID ${id} deleted`);
    }
  });
});

module.exports = router;
