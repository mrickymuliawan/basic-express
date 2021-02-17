const router = require('express').Router()
let fs = require('fs')
const studentModel = require('../models/studentModel')

router.get('/students/add',(req, res)=>{
  res.render('addstudentpage')
})

router.post('/students/add', (req, res) => {
  const newData = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }
  studentModel.createStudent(newData)
  res.redirect('/students')
})

router.get('/students/:email', (req, res) => {
  let students = JSON.parse(fs.readFileSync("../students.json","utf-8"))
  students = students.filter(item => item.email == req.params.email)
  res.send(students)
})

router.get('/students/:id/edit', (req, res) => {
  let students = JSON.parse(fs.readFileSync("../students.json","utf-8"))
  students = students.find(item => item.id == req.params.id)
  res.render('editstudentpage', students)
})

router.post('/students/:id/edit', (req, res) => {
  // apus yg lama
  let students = JSON.parse(fs.readFileSync("../students.json","utf-8"))
  students = students.filter(item => item.id != req.params.id)

// push yang baru
  students.push(req.body)
  const data = JSON.stringify(students)
  fs.writeFileSync('./students.json', data)
  res.redirect('/students')
})

router.get('/students/:id/delete', (req, res) => {
  studentModel.deleteStudent(req.params.id)
  res.redirect('/students')
})

router.get('/students', (req, res) => {
  studentModel.getAllStudent(function(err, result){
    res.render('studentpage',{
      data:result.rows
    })  
  })
})

module.exports = router

