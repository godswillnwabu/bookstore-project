const express = require("express")
const bodyParser = require("body-parser")
const CONFIG = require("./config/config")
const connectToDb = require("./db/mongodb")


const app = express()

//  Connect to Mongodb Database
connectToDb()

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/v1/books", bookRouter)

app.get("/", (req, res) => {
    res.send("Hello Bookstore")
})

// Error handler middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)

    next()
})




app.listen(CONFIG.PORT, () => {
    console.log(`Server started successfully on http://localhost:${CONFIG.PORT}`)
})