const router = require('express').Router()
let fs = require('fs')

router.get('/subjects/:id', (req, res) => {
  let subjects = JSON.parse(fs.readFileSync("./subjects.json","utf-8"))

  subjects = subjects.filter(function(item){
    return item.id == req.params.id
  })
  res.send(subjects)
})

module.exports = router

