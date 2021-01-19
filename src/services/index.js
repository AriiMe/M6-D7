const express = require("express");
const router = express.Router();
const articlesRoute = require("./articles");


router.use("/articles", articlesRoute);


module.exports = router;