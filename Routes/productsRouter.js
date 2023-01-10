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
        console.log('No cargado')
    }

    res.status(400).send("Bad request");
})

productsRouter.put('/:pid', (req, res) => {
    //Actualizar producto
    let update = req.body
    let productId = products.find( (e) => e.id == +req.params.pid)
    let updateId = req.params -1
    console.log(+req.params.pid - 1, 'put - productsid')

    _products[+req.params.pid - 1] = {
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
    console.log(update, 'put - update')
    console.log(_products, 'put - postupdate')
    res.send('Producto actualizado con exito!')
});

productsRouter.delete('/:pid', (req, res) => {

    _products = _products.filter((e) => e.id !== +req.params.pid)
    console.log('del', _products)
    
    fs.writeFileSync('./database/products.json', JSON.stringify(_products))

    res.send('Producto eliminado!');

})  

module.exports = { productsRouter };