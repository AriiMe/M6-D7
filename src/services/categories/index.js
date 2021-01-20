const express = require("express");
const Model = require("../../utilities/model");
const categories = new Model("categories");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const singlecategory = await categories.findById(req.params.id);
        res.send(singlecategory);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateCategory = await categories.findByIdAndUpdate(req.params.id, req.body);
        res.send(updateCategory);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const postCategory = await categories.save(req.body);
        res.send(postCategory);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await categories.findByIdAndDelete(req.params.id);
        res.send("yeeted");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.get("/", async (req, res) => {
    try {
        const getAllCategories = await categories.findOne();
        res.send(getAllCategories);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/count/all", async (req, res) => {
    try {
        const getAllCategories = await categories.countedCategories();
        res.send(getAllCategories);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;