const express = require('express')
const router = express.Router();
const { getDb, connectToDb } = require('../db')
const employeeController = require('../controllers/employeeController')
const app = express();
let db
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
})
router.get('/employee', employeeController.employee_details);

router.get('/:department/largest', employeeController.getOldestEmployee);

router.get('/:department/youngest', employeeController.getYoungestEmployee)

router.get('/department/sum', employeeController. getDepartmentSum)

router.get('/totalsum',  employeeController.getTotalSum)

router.get('/department/average', employeeController.getDepartmentAverage)

router.get('/average', employeeController.getAverage)

router.get('/:department/vacencies', employeeController.getDepartmentVacencies)

router.post('/addEmployee',employeeController.addEmployee)

module.exports = router;