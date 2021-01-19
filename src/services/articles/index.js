const express = require("express");
const Model = require("../../utilities/model");
const Articles = new Model("articles");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const singleArticle = await Articles.findById(req.params.id);
        res.send(singleArticle);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateArticle = await Articles.findByIdAndUpdate(req.params.id, req.body);
        res.send(updateArticle);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const postArticle = await Articles.save(req.body);
        res.send(postArticle);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteArticle = await Articles.findByIdAndDelete(req.params.id);
        res.send("yeeted");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.get("/", async (req, res) => {
    try {
        const getAllArticle = await Articles.findOne();
        res.send(getAllArticle);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
module.exports = router;