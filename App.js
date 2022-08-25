// Packges

const express = require('express');
const app = express();
const morgan = require("morgan")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Packges End


const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')

// CONEECTING MOGODB

const url = "mongodb+srv://pionneerr12:pionneerr12@cluster0.lwtezw9.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try{
        await mongoose.connect(url)
        console.log('Connected to MongoDB');
    } catch (error){
        console.log('Failed to connect to MongoDB');
        console.log(error);

    }}

    connect();



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

app.use((req, res, next) => {
    res.header(" Accces-control-allow-origin", "*"  );
    res.header(" Accces-control-allow-Header", " orgin , x-requst -with , Accept, Authorization" )
    
    if( req.method === 'OPTIONS' ) {
        res.header(" Accces-controls-allow-method  " , " PUT , GET , POST , PATCH, DELETE")
        return res.status(200).json({})
    }
    next();
})


module.exports =  app
