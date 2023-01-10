const express = require('express')
const productsRouter = express.Router()
let products = require('../database/products.json');
const fs = require('fs');

productsRouter.get('/', (req, res) => {
    const limit = req.query.limit

    if(limit && !isNaN(Number(limit)))
    {
        let response = products.slice(0,limit)
        res.send(response);
    }
    res.send(products)
});
productsRouter.get('/:pid', (req, res) => {
    const pid = req.params.pid  
    product = products.find((e) => e.id == pid);
    console.log(product)
    res.send(product)
});

productsRouter.put('/:pid', (req, res) => {
    //Actualizar producto
    let update = req.body
    let productId = products.find( (e) => e.id == +req.params.pid)
    let updateId = req.params -1
    console.log(+req.params.pid - 1, 'put - productsid')

    products[+req.params.pid - 1] = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        code: req.body.code,
        stock: req.body.stock,
        path: req.body.path,
        id: +req.params.pid
    }
    fs.writeFileSync('./database/products.json', JSON.stringify(products));
    console.log(update, 'put - update')
    console.log(products, 'put - postupdate')
    res.send('Producto actualizado con exito!')
});

productsRouter.delete('/:pid', (req, res) => {

    products = products.filter((e) => e.id !== +req.params.pid)
    console.log('del', products)
    
    fs.writeFileSync('./database/products.json', JSON.stringify(products))

    res.send('Producto eliminado!');

})  

module.exports = { productsRouter };