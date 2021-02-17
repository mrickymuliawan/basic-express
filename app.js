// const { json } = require('express')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.get('/', (req, res) => {
  res.send('<h1>Helloewewew<h1>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
