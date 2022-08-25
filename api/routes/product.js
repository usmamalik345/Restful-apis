const express = require('express')
const router = express.Router();
const Product = require("../models/product")
const mongoose = require("mongoose")


router.get("/" , (req , res , next) => {
    res.status(200).json({
        message: "handling Get Requst to post "
    })
});



router.post("/" , (req , res , next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId()
        name: req.body.name,
        price: req.body.price
    
    })
        product.save().then(result =>{
            console.log(result);
        })

    res.status(201).json({
        message: "handling post Requst to post ",
        createProduct: product

    });
});

// TALKING PRODUCT FROM MODELS / Product 

const product = new Product({
    _id: new mongoose.Types.ObjectId();
    name: req.body.name,
    price: req.body.price

})


router.get('/:productId', (req , res , next ) => {
    const id = req.params.productId
    if( id === "special") {
        res.status(200).json({
            message: "you Desribe Specail ID ",
            id: id
        });
    } else {
        res.status(200).json({
                    message: " you passed an id  "
                });
        
    }
} );



router.patch("/" , (req , res , next) =>{
    res.status(200).json({
        message: "Updates Product "
    })
})
// router.delete("/:productId" , (req , res , next)=> {
//     req.status(200).json({
//         message: "delete Product "
//     })
// })

router.delete("/" , (req , res , next) =>{
    res.status(200).json({
        message: "deletes Product "
    })
})

module.exports = router 