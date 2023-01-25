const express = require('express')
const router  = express.Router();
const { getDb, connectToDb } = require('..//db')
const app=express();
let db

connectToDb((err) => {
    if (!err) {
      db=getDb();
    }
  })
const employee_details=(req,res)=>{
    let employeeList = []
    db.collection('employees')
      .find()
      .forEach(employee => employeeList.push(employee))
      .then(() => {
        res.status(200).json(employeeList)
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not fetch the documents' })
      })
}
const getOldestEmployee=(req,res)=>{
    const departmentName = req.params.department;
    const data = db.collection('employees').find({ department: departmentName }).sort({ "age": -1 }).limit(1)
      .forEach(employee => res.status(200).json(employee))
}

const getYoungestEmployee=(req,res)=>{
    const departmentName = req.params.department;
    const data = db.collection('employees').find({ department: departmentName }).sort({ "age": 1 }).limit(1)
      .forEach(employee => res.status(200).json(employee))
}
const getDepartmentSum=(req,res)=>{
    db.collection('employees').aggregate([
        {
          $group: {
            _id: "$department",
            totalAge: { $sum: '$age' },
          },
        },
      ]).toArray()
        .then((data) => res.status(200).send(data))
}

const getTotalSum=(req,res)=>{
    db.collection('employees').aggregate([
        {
          $group: {
            _id: "$department",
            totalAge: { $sum: '$age' },
          },
        },
      ]).toArray()
        .then((data) => res.status(200).send(data))
}

const getDepartmentAverage=(req,res)=>{
    db.collection('employees').aggregate([
        {
          $group: {
            _id: "$department",
            averageAge: { $avg: '$age' },
          },
        },
      ]).toArray()
        .then((data) => res.status(200).send(data))
}
const getAverage=(req,res)=>{
    db.collection('employees').aggregate([
        {
          $group: {
            _id: null,
            averageAge: { $avg: '$age' },
          },
        },
      ]).toArray()
        .then((data) => res.status(200).send(data))
}

const getDepartmentVacencies=(req,res)=>{
    const departmentName = req.params.department;
    const ans = db.collection('employees').find({ department: departmentName }).count()
      .then((data) => {
        console.log(typeof data)
        const numberOfVacencies = 6 - data;
        console.log(numberOfVacencies);
        res.status(200).json(numberOfVacencies);
      })
}

const addEmployee=(req,res)=>{
    const data = req.body;

    if (data.age > 21 && data.age < 40) {
      db.collection('employees').find({ department: req.body.department }).count()
        .then(function (count) {
          console.log(count);
          if (count < 6) {
            db.collection('employees').insertOne(data)
              .then((result) => {
                res.status(201).json(result);
              })
              .catch(err => {
                res.status(500).json({ err: 'Could not create a new document' })
              })
          }
          else {
            console.log("cannot enter more than 6 documents");
          }
        })
    }
}

const getBoardOfDirectors=(req,res)=>{
  let boardOfDirectors=[];
  db.collection('employees').find({department:{$in:["Enginnering Department", "Operations"]}})
  .forEach((employee) =>{
    if(employee.age>40){
      console.log(employee);
      boardOfDirectors.push(employee);
    }
  })
  .then(() => {
    res.status(200).json(boardOfDirectors)
  })
  .catch(() => {
    res.status(500).json({ error: 'Could not fetch the Board of Directors' })
  })
}
module.exports={
    employee_details,
    getOldestEmployee,
    getYoungestEmployee,
    getDepartmentSum,
    getTotalSum,
    getDepartmentAverage,
    getAverage,
    getDepartmentVacencies,
    addEmployee,
    getBoardOfDirectors
}