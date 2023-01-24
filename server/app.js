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
// routes
// app.get('/employee', (req, res) => {
//   let employeeList = []

//   db.collection('employees')
//     .find()
//     .forEach(employee => employeeList.push(employee))
//     .then(() => {
//       res.status(200).json(employeeList)
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not fetch the documents' })
//     })
// })

// app.get('/:department/largest', (req, res) => {
//   const departmentName = req.params.department;
//   const data = db.collection('employees').find({ department: departmentName }).sort({ "age": -1 }).limit(1)
//     .forEach(employee => res.status(200).json(employee))
// })

// app.get('/:department/youngest', (req, res) => {
//   const departmentName = req.params.department;
//   const data = db.collection('employees').find({ department: departmentName }).sort({ "age": 1 }).limit(1)
//     .forEach(employee => res.status(200).json(employee))
// })

// app.get('/department/sum', (req, res) => {
//   db.collection('employees').aggregate([
//     {
//       $group: {
//         _id: "$department",
//         totalAge: { $sum: '$age' },
//       },
//     },
//   ]).toArray()
//     .then((data) => res.status(200).send(data))
// })

// app.get('/totalsum', (req, res) => {
//   db.collection('employees').aggregate([
//     {
//       $group: {
//         _id: null,
//         totalAge: { $sum: '$age' },
//       },
//     },
//   ]).toArray()
//     .then((data) => res.status(200).send(data))
// })

// app.get('/department/average', (req, res) => {
//   db.collection('employees').aggregate([
//     {
//       $group: {
//         _id: "$department",
//         averageAge: { $avg: '$age' },
//       },
//     },
//   ]).toArray()
//     .then((data) => res.status(200).send(data))
// })

// app.get('/average', (req, res) => {
//   db.collection('employees').aggregate([
//     {
//       $group: {
//         _id: null,
//         averageAge: { $avg: '$age' },
//       },
//     },
//   ]).toArray()
//     .then((data) => res.status(200).send(data))
// })

// app.get('/:department/vacencies', (req, res) => {
//   const departmentName = req.params.department;
//   const ans = db.collection('employees').find({ department: departmentName }).count()
//     .then((data) => {
//       console.log(typeof data)
//       const numberOfVacencies = 6 - data;
//       console.log(numberOfVacencies);
//       res.status(200).json(numberOfVacencies);
//     })
// })

// app.post('/addEmployee', (req, res) => {
//   const data = req.body;

//   if (data.age > 21 && data.age < 40) {
//     db.collection('employees').find({ department: req.body.department }).count()
//     .then(function (count) {
//       console.log(count);
//       if(count<6){
//         db.collection('employees').insertOne(data)
//         .then((result) => {
//           res.status(201).json(result);
//         })
//         .catch(err => {
//           res.status(500).json({ err: 'Could not create a new document' })
//         })
//       }
//       else{
//         console.log("cannot enter more than 6 documents");
//       }
//     })
//   }
// })




