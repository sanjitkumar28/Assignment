const express = require('express')
const cors=require('cors')
const { getDb, connectToDb } = require('./db')
const addData = require('./models//Employee');
const { ObjectId } = require('mongodb')
const employeeRoutes=require('./routes//employeeRoutes')
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
let db

connectToDb((err) => {
  if (!err) {
    app.listen('9002', () => {
      db = getDb()
      console.log('app listening on port 9002')
      addData();
    })
  }
})

app.use(employeeRoutes);
