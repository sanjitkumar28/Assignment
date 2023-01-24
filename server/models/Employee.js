const employeeData=require('./data')
const { getDb, connectToDb } = require('../db.js')
let db
const addData = () => {
    connectToDb((err) => {
        if (!err) {
            db = getDb()
            let coll = db.collection('employees');
            coll.count().then((count) => {
                if(count==0){
                    db.collection('employees').insertMany(employeeData);
                } 
            }); 
        }
    })
}
module.exports =addData;


