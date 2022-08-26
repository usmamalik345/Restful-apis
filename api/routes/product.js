const express = require('express')
const router = express.Router();
const Product = require("../models/product")
const mongoose = require("mongoose");
const { request } = require('express');


router.get("/", (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then( docs => { 
        const response = {
            count: docs.length,
            product: docs.map( doc => {
                return {
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                request : {
                    type: "GET",
                    url: "http://localhost:3000/product/" + doc._id
                }
            }
            })
        }

        console.log(docs);
        res.status(200).json(response);
    } )
    .catch( err => {
        console.log(err);
        res.status(500).json({error: err})
    })
    
});



router.post("/", (req, res, next) => {

    const product = new Product({

        // I USE REQ.USERR HERE FROM STACKOVERFLOW WHY WE USE THIS


        _id: new mongoose.Types.ObjectId(req.user),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        res.status(201).json({
            message: "handling post Requst to post ",
            createProduct: product

        });
        console.log(result);
    }).catch(err => console.log(err))


});




router.get('/:productId', (req, res, next) => {
    const id = req.params.productId

    Product.findById(id).select(" name price _id")
    .exec().then(doc => {
        console.log( "from Database ", doc);
            if(doc) {
                
                res.status(200).json({
                    product: doc, 
                request: { 
                    type: "GET",
                    url: "http://localhost:3000/product/",
                    desp: "Get all Product"

                }
                })
            }else {
                res.status(404).json({
                                    message: "Product not found",
                                    error: "Product not found"
                                })
                
            }


        
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })




    // wHY WE Comment THIS CODE AND WRITE NEW ONE


    // if( id === "special") {
    //     res.status(200).json({
    //         message: "you Desribe Specail ID ",
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //                 message: " you passed an id  "
    //             });

    // }
});



router.patch('/:productId', async (req, res, next) => {
    const props = req.body;
    try {
        const result = await Product.update({_id: req.params.productId}, props).exec();
        console.log(result);
        res.status(200).json({
            message: "Product updated", 
                request: { 
                    type: "GET",
                    url: "http://localhost:3000/product/"  + props
                    

                }
            
        });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    } )
})

module.exports = router 