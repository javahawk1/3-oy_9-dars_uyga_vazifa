const express = require("express")
const Customerrouter = require("./customer.routes.js")
const Regionrouter = require("./region.routes.js")
const Water_productrouter = require("./water_products.routes.js")

const index = express.Router()

index.use("/customer", Customerrouter)
index.use("/region", Regionrouter)
index.use("/water_product", Water_productrouter)

module.exports = index
