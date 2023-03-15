// routes/users.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const client = require('../db');
// GET all users
router.get('/', async (req, res) => {
  const users = await client.db("mydb").collection('flowers').find().toArray();
  res.json(users);
});

// POST a new user
router.post('/', async (req, res) => {
  const newFlower = req.body;
  const result = await client.db("mydb").collection('flowers').insertOne(newFlower);
  if (result.acknowledged) {
    res.json(newFlower);
  } else {
    res.status(400).send('Failed to insert flower');
  }
});

// GET a user by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await client.db("mydb").collection('flowers').findOne({ _id: new ObjectId(id)});
  res.json(result);
});

// PUT a user by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await client.db("mydb").collection('flowers').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
  res.json(result);
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await client.db("mydb").collection('flowers').deleteOne({ _id: new ObjectId(id) });
  res.json(result);
});

module.exports = router;
