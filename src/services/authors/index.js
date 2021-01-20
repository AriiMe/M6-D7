const express = require("express");
const Model = require("../../utilities/model");
const Authors = new Model("authors");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const singleAuthor = await Authors.findById(req.params.id);
        res.send(singleAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedAuthor = await Authors.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.send(updatedAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newAuthor = await Authors.save(req.body);
        res.send(newAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Authors.findByIdAndDelete(req.params.id);
        res.send("EXECUTED");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const allAuthors = await Authors.findOne(req.query);
        res.send(allAuthors);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;