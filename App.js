// Packges

const express = require('express');
const app = express();
const morgan = require("morgan")
const bodyParser = require('body-parser')

// Packges End


const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')



app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routers which Handles Requst


app.use("/product", productRoutes)
app.use("/order", orderRoutes)

// Error handling 

app.use((req, res, next) =>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports =  app
