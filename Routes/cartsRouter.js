const express = require("express");
const cartsRouter = express.Router();
const middlewares = require("../middlewares");
const fs = require("fs");
let products = require("../database/products.json");
let carts = require("../database/carts.json");

cartsRouter.get("/:cid", (req, res) => {
  const cid = +req.params.cid;

  cart = carts.find((e) => e.id == cid);
  console.log(cart);
  res.send(cart);
});
cartsRouter.get('/:cid', (req, res) => {
    const cid = req.params.cid
    cart = carts.find((e) => e.cid == cid )
    res.send(cart)
})

cartsRouter.post("/", (req, res) => {

  length = carts.length + 1

  let cart = {
    id: length,
    products: [],
  };

  carts.push(cart);
  console.log(carts);
  fs.writeFileSync("./database/carts.json", JSON.stringify(carts));
  res.status(200).send("Ok");
  // res.status(400).send('Bad request')
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    

    const productToAdd = 
    {
        'id': pid,
        'quantity': 1
    }

    let cart = carts.find((e) => e.id == +cid)
    console.log('Cart: ', cart)
    let exists = cart.products.some((e) => e.id == productToAdd.id)

    let product = cart.products.find((e) => e.id == +pid)

    console.log('Exists: ', exists)
    if(exists) {
        product.quantity += 1
    } else {
        cart.products.push(productToAdd)
    }
    console.log('Product to add: ', productToAdd)
    console.log('Product: ', product)
    console.log('Cart post: ', cart)
    console.log('Carts post', carts)
    fs.writeFileSync("./database/carts.json", JSON.stringify(carts));
    res.status(200).send('Ok')
}
)

module.exports = { cartsRouter };
