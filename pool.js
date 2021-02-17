const { Pool } = require('pg')
//for database school 
const pool = new Pool ({
    user: 'user',
    host: 'localhost',
    database: 'coba',
    password: 'password',
    port: 5432
})

module.exports = pool;