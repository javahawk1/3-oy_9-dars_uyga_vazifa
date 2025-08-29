const express = require("express")
const {
    AddWater_product,
    DeleteWater_product,
    GetOneWater_product,
    GetWater_products,
    PatchWater_product
} = require("../controllers/water_product.controller.js")

const router = express.Router()

router.get("/", GetWater_products)
router.get("/:id", GetOneWater_product)
router.post("/", AddWater_product)
router.patch("/:id", PatchWater_product)
router.delete("/:id", DeleteWater_product)

module.exports = router
