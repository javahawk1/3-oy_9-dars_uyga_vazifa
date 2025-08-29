const express = require("express")
const {
    AddRegion,
    DeleteRegion,
    GetOneRegion,
    GetRegions,
    PatchRegion
} = require("../controllers/region.controller.js")

const router = express.Router()

router.get("/", GetRegions)
router.get("/:id", GetOneRegion)
router.post("/", AddRegion)
router.patch("/:id", PatchRegion)
router.delete("/:id", DeleteRegion)

module.exports = router
