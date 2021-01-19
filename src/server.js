const express = require("express");
const cors = require("cors");

const servicesFolder = require("./services");

const server = express();
const port = process.env.PORT || 9001

server.use(cors())
server.use(express.json())

server.use("/aaaa", servicesFolder)

server.listen(port, () => {
    console.log("server running on port: " + port)
})