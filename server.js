const express = require('express')
const app = express()
const { urlencoded } = require('express');
const { productsRouter } = require('./Routes/productsRouter')
const { cartsRouter } = require('./Routes/cartsRouter');



app.use(express.json());
app.use(express.urlencoded({ extended: true}));




app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening  http://localhost:${PORT}`)
});

