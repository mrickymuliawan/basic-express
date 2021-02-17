let fs = require('fs')
const pool = require('../pool')

const getAllStudent = function (cb) {
  const query = 'SELECT * FROM students'
  
  pool.query(query, (err,result)=>{
    cb(err, result)
  })
}

const createStudent = function (data) {
  const query = `INSERT INTO students 
    (first_name, last_name, email) 
    values ('${data.first_name}','${data.last_name}','${data.email}') `
  
  pool.query(query)
}
const deleteStudent = function (id) {
  let students = JSON.parse(fs.readFileSync("../students.json","utf-8"))
  students = students.filter(item => item.id != id)

  const data = JSON.stringify(students)
  fs.writeFileSync('../students.json', data)
}

module.exports = {getAllStudent, deleteStudent, createStudent}