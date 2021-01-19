const express = require("express");
const router = express.Router();
const articlesRoute = require("./articles");
const categoriesRoute = require("./categories");

router.use("/articles", articlesRoute);
router.use("/categories", categoriesRoute);

module.exports = router;