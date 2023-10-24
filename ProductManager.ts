import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as crypto from 'crypto';
import express from 'express';
import * as http from 'http';
import axios from 'axios';


// function encrypt(value:number,salt:number){
//     crypto.createHmac('sha256',salt).update(value).digest('hex')
// }
const app = express()
app.get('/create',(req,res)=>{
    res.send('Server created from express')
})
app.listen(8080,()=>{
    console.log('Server mounted in port 8080')
})
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
constructor(public products:ProductInterface[],private path:string){}
    
    addProduct(product:ProductInterface){
        const existingProduct = this.products.find(p=>p.code === product.code)
        
        if(existingProduct){
            console.log('A product with that code already exists')
        }
        if(!product.title||!product.description||!product.price||!product.thumbnail||!product.code||!product.code){
            console.log('All fields are mandatory')
            return;
        }
        product.id = uuidv4()
        let values = {
            title:product.title, 
            description:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
            id:product.id
        }
        this.products.push(values)
        try {
                fs.writeFileSync(this.path, JSON.stringify(this.products,null,2));
        } catch (error) {
            throw new Error(`404: Error writing file ${error}`)
        }
    }
    getProducts(){
        try {
            const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            
            if(!readFile){
                
            }
            console.log('200: File successfully read.');
            return readFile;
        } catch (error) {
            throw new Error(`${error}`);
        }
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
    deleteProduct(productId:string):ProductInterface|undefined{
        const deletedProduct = this.products.filter(p=>p.id!==productId)
        if(deletedProduct){
            this.products = deletedProduct
            fs.writeFileSync(this.path,JSON.stringify(this.products,null,2))
           console.log('Product deleted successfully')
        }else{
            console.log('Could not delete; Product ID not found')
            return undefined
        }
    }
    updateProduct(productId:string,updatedProduct:Partial<ProductInterface>):ProductInterface|undefined{
        const productToUpdate = this.products.find(p=>p.id === productId)
        if(productToUpdate){
            Object.assign(productToUpdate, updatedProduct)
           fs.writeFileSync(this.path,JSON.stringify(this.products,null,2))
           return productToUpdate;
        }else{
            console.log('Could not delete; Product not found')
            return undefined
        }
    }
}

const productManager = new ProductManager([],'./Logs/Logs.txt')

const product1:ProductInterface = {
  title: 'Product 1',
  description: 'Description for Product 1',
  price: 15,
  thumbnail: 'product1.jpg',
  code: 'P1',
  stock: 150,
  id: uuidv4(),
}
const product2:ProductInterface = {
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 20,
    thumbnail: 'product2.jpg',
    code: 'P2',
    stock: 300,
    id: uuidv4(),
  }
  productManager.addProduct(product1)
  productManager.addProduct(product2)
  console.log('ALL PRODUCTS: ', productManager.getProducts())
  const productById1 = productManager.getProductById(product1.id)
  const productById2 = productManager.getProductById(product2.id)
  console.log('PRODUCT 1 BY ID:',productById1)
  console.log('PRODUCT 2 BY ID:',productById2)

 //productManager.deleteProduct(product1.id) 

 //productManager.updateProduct(product1.id, {description:'Esta es una description actualizada'})