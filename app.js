// const { json } = require('express')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
let fs = require('fs')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Helloewewew<h1>')
})

app.get('/students/add', (req, res) => {
  res.render('addstudentpage')
})

app.post('/students/add', (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  const newData = {
    id: students[students.length - 1].id + 1,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }
  students.push(newData)
  const data = JSON.stringify(students)
  fs.writeFileSync('./students.json', data)
  res.redirect('/students')
})

app.get('/students/:email', (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  students = students.filter(item => item.email == req.params.email)
  res.send(students)
})

app.get('/students/:id/edit', (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  students = students.find(item => item.id == req.params.id)
  res.render('editstudentpage', students)
})

app.post('/students/:id/edit', (req, res) => {
  // apus yg lama
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  students = students.filter(item => item.id != req.params.id)

// push yang baru
  students.push(req.body)
  const data = JSON.stringify(students)
  fs.writeFileSync('./students.json', data)
  res.redirect('/students')
})

app.get('/students/:id/delete', (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  students = students.filter(item => item.id != req.params.id)

  const data = JSON.stringify(students)
  fs.writeFileSync('./students.json', data)
  res.redirect('/students')
})

app.get('/students', (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json","utf-8"))
  res.render('studentpage',{
    data:students
  })
})


app.get('/teachers', (req, res) => {
  let teachers = JSON.parse(fs.readFileSync("./teachers.json","utf-8"))

  res.render('teacherpage',{
    data:teachers
  })
})

app.get('/teachers/:id', (req, res) => {
  let teachers = JSON.parse(fs.readFileSync("./teachers.json","utf-8"))

  teachers = teachers.filter(function(item){
    return item.id == req.params.id
  })
  res.render('teacherpage',{
    data:teachers
  })
})


app.get('/subjects/:id', (req, res) => {
  let subjects = JSON.parse(fs.readFileSync("./subjects.json","utf-8"))

  subjects = subjects.filter(function(item){
    return item.id == req.params.id
  })
  res.send(subjects)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
