const products = []


class ProductManager {

    static id = 1

        constructor(title, description, price, thumbnail, code, stock) {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code    
            this.stock = stock
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
                ProductManager.id ++
            }
            
        }

    

}

    function getProducts () {

    console.log(products);

    }

    function getProductsById(id){
        console.log('Producto por id: ')
        let idProduct = products.find(element => element.id === id)
        console.log(idProduct)
    }

const banana = new ProductManager('Banana', 'banana', 500, 'imagen', 100, 6)
const uva = new ProductManager('Uva', 'Uva', 500, 'imagen', 100, 6)
const pera = new ProductManager('Pera', 'Pera', 500, 'imagen', 300, 6)
const frutilla = new ProductManager('Frutilla', 'Frutilla', 580, 'imagen', 580, 6)
const naranja = new ProductManager('Naranja', '', '', 'imagen', 580, 6)


banana.addProduct()
uva.addProduct()
pera.addProduct()
frutilla.addProduct()
naranja.addProduct()
getProducts()

getProductsById(2)

