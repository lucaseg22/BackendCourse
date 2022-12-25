const express = require('express')
const app = express()

let products = require('./index.js')


app.get('/', function (req, res) {
res.send('Hello World')
})

app.get('/products', function (req, res) {
    let response = products
    const limit = req.query.limit

    if(limit && !isNaN(Number(limit))) 
    {
        response = response.slice(0,limit)
        res.send( 
            response
            )
    }

res.send( 
    products
    )
})
app.get('/products/:pid', function (req, res) {
    const pid = req.params.pid

    product = products.find((e) => e.id == pid)
    res.send(product)
    })

app.listen(3000)