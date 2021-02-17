const router = require('express').Router()
let fs = require('fs')

router.get('/teachers', (req, res) => {
  let teachers = JSON.parse(fs.readFileSync("./teachers.json","utf-8"))

  res.render('teacherpage',{
    data:teachers
  })
})

router.get('/teachers/:id', (req, res) => {
  let teachers = JSON.parse(fs.readFileSync("./teachers.json","utf-8"))

  teachers = teachers.filter(function(item){
    return item.id == req.params.id
  })
  res.render('teacherpage',{
    data:teachers
  })
})

module.exports = router