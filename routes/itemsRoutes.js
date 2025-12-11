const express = require("express");
const router = express.Router();
const itemsModel = require("../models/itemsModel");

router.get("/:id", async (req, res) => {
    const subcategoria_id = req.params.id;

    try {
        const data = await itemsModel.getBySubcategoria(subcategoria_id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});


module.exports = router;
