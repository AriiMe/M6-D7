const express = require('express')
const cors = require('cors')

const server = express()
const port = process.env.PORT || 9001

server.use(cors())
server.use(express.json())

server.listen(port, () => {
    console.log("server running on port: " + port)
})