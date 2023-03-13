const dotenv = require("dotenv");
const MongoClient = require('mongodb').MongoClient;

const PORT = 8000;
dotenv.config();


// Connect to MongoDB database
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
