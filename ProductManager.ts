
interface ProductInterface{
    title:string,
    description:string,
    price:number,
    thumbnail:string,
    code:string,
    stock:number,
    id:number
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
        if(!product.title||!product.description||!product.price||!product.thumbnail||!product.code||!product.code||!product.id){
            console.log('All fields are mandatory')
            return;
        }
        
        this.products.push(product)
    }
}

