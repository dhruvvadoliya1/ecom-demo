const logModel = require('../models/logModel');
const productModel = require('../models/productModel');
const { validate } = require('../models/userModel');
const LogService = require('./logService');

class ProductService {
    static async validateProductId(productId, throwError){
        let product = await productModel.findById(productId);
        if(!product && throwError){
            throw new Error('Product with given id does not exist.')
        }
        return product;
    }

    static async validateProductTitle(title, throwError){
        let product = await productModel.findOne({title, deletedAt: null})
        if(product && throwError){
            throw new Error('Product with given title already exists.')
        }
        return product;
    }

    static async create(userId, data){   
        await this.validateProductTitle(data.title, true)

        let product = new productModel(data);
        await product.save();

        await LogService.recordLog(userId, 'Product Created', product);
        return [product];
    }

    static async getProducts(productId, queryParam){
        let query = {deletedAt: null}
        
        if(productId){
            query._id = productId
        }

        if(queryParam.minPrice && !isNaN(queryParam.minPrice)){
            query.price = { $gte: queryParam.minPrice}
        }

        if(queryParam.maxPrice && !isNaN(queryParam.maxPrice)){
            query.price = query.price ? {...query.price, $lte: queryParam.maxPrice} : {$lte: queryParam.maxPrice}
        }

        if(queryParam.category && Array.isArray(queryParam.category)){
            query.category = { $in : queryParam.category }
        }

        if(queryParam.isAvailable) {
            query.stock = { $gt : 0 }
        }
        
        let products = await productModel.find(query);
        return products;
    }

    static async updateProduct(userId, productId, data) {
        const product = await this.validateProductId(productId, true);
        if (data.title && data.title != product.title){
            await this.validateProductTitle(data.title, true)
        }

        const updatedProduct = await productModel.findOneAndUpdate({ _id : productId, deletedAt: null}, data, {new:true});
        
        await LogService.recordLog(userId, 'Product updated', updatedProduct);
        return updatedProduct;
        
    }

    static async updateProductStock(userId, products){
        await productModel.bulkWrite(products.map(product => {

            return {
                updateOne: {
                    filter: { _id: product._id },
                    update: { $inc: { stock: -product.quantity } }
                }
            }
        }))

        await logModel.bulkWrite(products.map(product => {
            return {
                insertOne: {
                    document: {
                        userId: userId,
                        action: 'Product sold',
                        details: {
                            productId: product._id,
                            quantity: product.quantity
                        },
                        timestamp: new Date()
                    }
                }
            }
        }))
    }

    static async deleteProduct(productId) {
        const product = await productModel.findOneAndUpdate({ _id : productId, deletedAt: null}, {deletedAt: Date.now()}, {new:true});
        if(!product){
            throw new Error('Product not found');
        }
        return true;  
    }


}

module.exports = ProductService;