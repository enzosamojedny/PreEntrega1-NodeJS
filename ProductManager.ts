import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();
interface ProductInterface{
    title:string,
    description:string,
    price:number,
    thumbnail:string,
    code:string,
    stock:number,
    id:string
}
class ProductManager{
    products: ProductInterface[]
constructor(products:ProductInterface[]){
    this.products = products;
    }
    
    addProduct(product:ProductInterface){
        const existingProduct = this.products.find(p=>p.code === product.code)
        if(existingProduct){
            console.log('A product with that code already exists')
        }
        if(!product.title||!product.description||!product.price||!product.thumbnail||!product.code||!product.code){
            console.log('All fields are mandatory')
            return;
        }
            product.id = uuid
        this.products.push({
            title:product.title,
            description:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
            id:product.id
        })
    }
    getProduct(){
        return this.products;
    }
    getProductById(productId:string):ProductInterface|undefined{
        const foundProduct = this.products.find(p=>p.id===productId)
        if(foundProduct){
           return  foundProduct;
        }else{
            console.log('Not found')
            return undefined
        }
        
    }
}

const productManager = new ProductManager([])

const product1:ProductInterface = {
  title: 'Product 1',
  description: 'Description for Product 1',
  price: 15,
  thumbnail: 'product1.jpg',
  code: 'P1',
  stock: 150,
  id: '',
}
productManager.addProduct(product1)
console.log('Products: ', productManager.getProduct())

const productById1 = productManager.getProductById(product1.id)
console.log(productById1)

const product2:ProductInterface = {
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 15,
    thumbnail: 'product2.jpg',
    code: 'P3',
    stock: 300,
    id: '',
  }
  productManager.addProduct(product2)
  console.log('Products: ', productManager.getProduct())
  const productById2 = productManager.getProductById(product2.id)
console.log(productById2)