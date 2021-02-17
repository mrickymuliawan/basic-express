const router = require('express').Router()

const teacherRoutes = require('./teacherRoutes')
const studentRoutes = require('./studentRoutes')
const subjectRoutes = require('./subjectRoutes')

router.use(studentRoutes)
router.use(teacherRoutes)
router.use(subjectRoutes)

module.exports = router