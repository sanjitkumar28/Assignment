const express = require('express')
const { getDb, connectToDb } = require('./db')
const addData = require('./models//Employee');
const { ObjectId } = require('mongodb')
const employeeRoutes=require('./routes//employeeRoutes')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
let db

connectToDb((err) => {
  if (!err) {
    app.listen('3000', () => {
      db = getDb()
      console.log('app listening on port 3000')
      addData();
    })
  }
})

app.use(employeeRoutes);
