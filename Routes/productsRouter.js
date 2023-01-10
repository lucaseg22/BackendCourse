const express = require('express')
const productsRouter = express.Router()
const fs = require('fs');


let _products = require('../database/products.json');
let products = []

productsRouter.get('/', (req, res) => {
    const limit = req.query.limit

    if(limit && !isNaN(Number(limit)))
    {
        let response = _products.slice(0,limit)
        res.send(response);
    }
    res.send(_products)
});

productsRouter.get('/:pid', (req, res) => {
    const pid = req.params.pid  
    product = _products.find((e) => e.id == pid);
    console.log(product)
    res.send(product)
});

productsRouter.post('/', (req, res) => {

    let length = Object.keys(_products).length
    let lengthUpdate = length + 1
    let product = req.body

    product = { ...product, id: lengthUpdate }
    if (product) {
        console.log(req.body)
        _products.push(product) 
        fs.writeFileSync('./database/products.json', JSON.stringify(_products));
        return res.send('Ok');
        
    }  else {
        res.status(400).send("Bad request");
    }

})

productsRouter.put('/:pid', (req, res) => {

    let pid = req.params.pid
    let numb = (e) => e.id == pid
    let index = _products.findIndex(numb)

    index = Number(index)
    _products[index] = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        code: req.body.code,
        stock: req.body.stock,
        path: req.body.path,
        id: +req.params.pid
    }
    fs.writeFileSync('./database/products.json', JSON.stringify(_products));
    res.send('Producto actualizado con exito!')
});

productsRouter.delete('/:pid', (req, res) => {

    _products = _products.filter((e) => e.id !== +req.params.pid)    
    fs.writeFileSync('./database/products.json', JSON.stringify(_products))
    res.send('Producto eliminado!');

})  

module.exports = { productsRouter };