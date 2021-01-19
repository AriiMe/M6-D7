const { Pool } = require('pg')
const pool = new Pool()

module.exports = {
    async query(text, params) {
        const startQuery = Date.now()
        const response = await pool.query(text, params)
        const durationOfQuery = Date.now() - startQuery
        console.info("query took" + durationOfQuery + "ms")
        return response
    },
    pool,
}