const express = require('express')

const router = express.Router();

router.get("/" , (req , res, next) =>{
    res.status(200).json({
        message: "Orders Were fetch"
    })
})

router.post("/" , (req , res, next) =>{
    res.status(201).json({
        message: "Orders Were fetch"
    })
})

router.get("/:ordersId" , (req , res, next) =>{
    res.status(201).json({
        message: "Orders details",
        ordersId: req.params.ordersId        
    })
})
module.exports = router;

