const express = require("express")
const index = require("./routes/index.js")

const config = require("config")

const PORT = config.get("port")

const app = express()
app.use(express.json())
app.use("/api", index)

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`server on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()