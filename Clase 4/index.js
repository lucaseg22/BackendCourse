const fs = require('fs');

const archive = JSON.parse(fs.readFileSync('index.json', (err) => {if (err) throw err}))

const products = archive;

class ProductManager {
    
    static id = 1

        constructor(title, description, price, thumbnail, code, stock, path) {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code    
            this.stock = stock
            this.path = path
            ProductManager.id

        }

        addProduct() {
        
            const product = ({
                title: this.title,
                description: this.description,
                price: this.price,
                thumbnail: this.thumbnail,
                code: this.code,
                stock: this.stock,
                path: this.path,
                id: ProductManager.id
            })

            const validate = products.find(element => element.code === this.code)

            if (!product.title || !product.description || !product.price ||

                !product.thumbnail || !product.code || !product.stock) {

            return console.log('Todos los campos son obligatorios');
            }

            console.log('Validate: ', validate)
            console.log('-------------------')
            if (validate != undefined) {
                console.log( 'Codigo de producto existente')
            }
            else {
                products.push(product)
                fs.writeFile('index.json', JSON.stringify(products), (err) => { if (err) throw err})
                ProductManager.id ++
            }

            
        }

        
    }
    
    function updateProduct (id, edit) {
        let product = products.find(element => element.id === id)
        console.log(product)
        edit = [{...edit, path: product.path, id: id}]
        console.log('up ', edit)
        let updating = products.filter(product => product.id != id)
        updating.push(edit)
        fs.writeFile('index.json', JSON.stringify(updating), (err) => { if (err) throw err});
        
    }

    function deleteProduct(id) {
        let deleting = products.filter(product => product.id != id)
        fs.writeFile('index.json', JSON.stringify(deleting), (err) => { if (err) throw err})
    }

    function getProducts () {
        
    console.log(products);

    }

    function getProductsById(id){
        console.log('Producto por id: ')
        let idProduct = products.find(element => element.id === id)
        console.log(idProduct)
    }

const banana = new ProductManager('Banana', 'banana', 500, 'imagen', 100, 6, './index.json');
const uva = new ProductManager('Uva', 'Uva', 500, 'imagen', 100, 6, './index.json');
const pera = new ProductManager('Pera', 'Pera', 500, 'imagen', 300, 6, './index.json');
const frutilla = new ProductManager('Frutilla', 'Frutilla', 580, 'imagen', 580, 6, './index.json');
const naranja = new ProductManager('Naranja', '', '', 'imagen', 580, 6, './index.json');

const updatedProduct = {
    title: 'Manzana',
    description: 'Manzana',
    price: 600,
    thumbnail: 'imagen',
    code: '9089ffef',
    stock: 90
}

banana.addProduct()
uva.addProduct()
pera.addProduct()
frutilla.addProduct()
naranja.addProduct()
getProducts()


// updateProduct(3, updatedProduct);
// deleteProduct(1);

