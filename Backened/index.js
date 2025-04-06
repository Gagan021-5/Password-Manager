const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);



const dbName = 'passwordManger';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

 client.connect();



app.get('/',async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
}) 


//saves
app.post('/',async (req, res) => {
  const val = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(val);
  res.send({sucess:true});
})


//delete data

app.delete('/',async (req, res) => {
    const val = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
 const findResult = await collection.deleteOne(val);
  res.send({sucess:true,result: findResult});
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})