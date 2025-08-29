const express = require("express")
const {
    AddCustomer,
    DeleteCustomer,
    GetCustomers,
    GetOneCustomer,
    PatchCustomer
} = require("../controllers/customer.controller.js")

const router = express.Router()

router.get("/", GetCustomers)
router.get("/:id", GetOneCustomer)
router.post("/", AddCustomer)
router.patch("/:id", PatchCustomer)
router.delete("/:id", DeleteCustomer)

module.exports = router
