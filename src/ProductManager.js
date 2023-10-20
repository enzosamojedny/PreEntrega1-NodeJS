//? how to apply crypto library to my project?
//? read about path library
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
class ProductManager {
    constructor(products, path) {
        this.products = products;
        this.path = path;
    }
    addProducts(product) {
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            console.log('A product with that code already exists');
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.code) {
            console.log('All fields are mandatory');
            return;
        }
        product.id = uuidv4();
        let values = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            id: product.id
        };
        this.products.push(values);
        try {
            if (this.path) {
                fs.writeFileSync(this.path, JSON.stringify(values) + '\n');
                console.log('201: File created successfully');
            }
            else {
                fs.appendFileSync(this.path, JSON.stringify(values) + '\n');
            }
        }
        catch (error) {
            throw new Error(`404: Error writing file ${error}`);
        }
    }
    getProducts() {
        try {
            const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if (!readFile) {
            }
            console.log('200: File successfully read.');
            return readFile;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    getProductById(productId) {
        const foundProduct = this.products.find(p => p.id === productId);
        if (foundProduct) {
            return foundProduct;
        }
        else {
            console.log('Not found');
            return undefined;
        }
    }
    deleteProduct(productId) {
        const foundProduct = this.products.find(p => p.id === productId);
        if (foundProduct) {
            fs.unlink(this.path, (error) => {
                throw new Error(`${error === null || error === void 0 ? void 0 : error.message}`);
            });
        }
        else {
            console.log('Could not delete; Product ID not found');
            return undefined;
        }
    }
    updateProduct(productId) {
        const foundProduct = this.products.find(p => p.id === productId);
        if (foundProduct) {
            fs.writeFileSync(this.path, 'utf-8');
        }
        else {
            console.log('Could not delete; Product ID not found');
            return undefined;
        }
    }
}
const productManager = new ProductManager([], '../logs/Logs.txt');
const product1 = {
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 15,
    thumbnail: 'product1.jpg',
    code: 'P1',
    stock: 150,
    id: uuidv4(),
};
const product2 = {
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 20,
    thumbnail: 'product2.jpg',
    code: 'P2',
    stock: 300,
    id: uuidv4(),
};
productManager.addProducts(product1);
productManager.addProducts(product2);
console.log('ALL PRODUCTS: ', productManager.getProducts());
const productById1 = productManager.getProductById(product1.id);
const productById2 = productManager.getProductById(product2.id);
console.log('PRODUCT 1 BY ID:', productById1);
console.log('PRODUCT 2 BY ID:', productById2);
