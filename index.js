const express = require("express");
const dotenv = require("dotenv");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
// Routes
//
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
