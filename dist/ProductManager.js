"use strict";
class ProductManager {
    constructor(products) {
        this.products = products;
    }
    addProduct(product) {
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            console.log('A product with that code already exists');
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.code || !product.id) {
            console.log('All fields are mandatory');
            return;
        }
        this.products.push(product);
    }
}
