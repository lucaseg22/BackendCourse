const express = require('express')
const app = express()
const { urlencoded } = require('express');
const { productsRouter } = require('./Routes/productsRouter')
const _products = require('./database/products.json')
const fs = require('fs');
const { cartsRouter } = require('./Routes/cartsRouter');

let products = []

app.use(express.json());
app.use(express.urlencoded({ extended: true}));




app.get('/', function (req, res) {
    res.send('Hello World')
})
app.post('/', function (req, res) {

    let length = Object.keys(_products).length
    let lengthUpdate = length + 1
    let product = req.body
    console.log(_products, ' Aca')
    product = { ...product, id: lengthUpdate }
    console.log('ok pre if')

    if (product) {
        console.log(req.body)
        _products.push(product) 
        console.log('Llego al push')
        
        fs.writeFileSync('./database/products.json', JSON.stringify(_products));
        products = []
        return res.send('Ok');
        
    }  else {
        console.log('No cargado')
    }


    res.status(400).send("Bad request");
})

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening  http://localhost:${PORT}`)
});

