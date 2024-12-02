const orderModel = require('../models/orderModel');
const { ObjectId } = require('../utils/mongooseConnection');
const ProductService = require('./productService');
const LogService = require('./logService');

class OrderService {
    static async validateOrderId(orderId, throwError){
        let product = await orderModel.findById(orderId);
        if(!product && throwError){
            throw new Error('order with given id does not exist.')
        }
        return product;
    }

    static async validateOrderProducts(products){
        return Promise.all(products?.map(async (product) => {
            let productData = await ProductService.validateProductId(product.productId, true);
            
            if(productData.stock < product.quantity){
                throw new Error('Insufficient stock.')
            }
            productData.quantity = product.quantity;
            return productData;
        }));
    }

    static async addOrder(userId, data){
        if(!data.products || data.products?.length === 0){
            throw new Error('Order should contain atleast one product.')
        }

        let productDetails = await this.validateOrderProducts(data.products);
        let order = new orderModel(data);
        
        order.userId = userId;
        order.totalAmount = productDetails.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        await order.save();
        await LogService.recordLog(userId, 'Order placed', order);

        await ProductService.updateProductStock(userId, productDetails);
        

        return [order];
    }

    static async generateOrderReceipt(orderId){
        let order = await orderModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(orderId),
                    deletedAt: null
                }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                $addFields: {
                    "products.title": "$productInfo.title",
                    "products.price": "$productInfo.price"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    totalAmount: { $first: "$totalAmount" },
                    status: { $first: "$status" },
                    products: { $push: "$products" }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    status: 1,
                    products: {
                        _id: 1,
                        title: 1,
                        price: 1,
                        quantity: 1
                    }
                }
            }
        ]);

        return order;
    }

    static async updateOrderStatus(orderId, status){
        let order = await orderModel.findOneAndUpdate({ _id: orderId, deletedAt: null}, { status }, { new: true});
        if(!order){
            throw new Error('Order not found');
        }

        await LogService.recordLog(order.userId, `Order status updated to ${status}`, order);

        return order; 
    }

    static async getOrders(queryParam){
        let query = {deletedAt: null}
        if(queryParam.userId){
            query.userId = queryParam.userId
        }
        if(queryParam.productId){
            query.products = { $elemMatch: { productId: queryParam.productId}}
        }
        if(queryParam.status){
            query.status = queryParam.status
        }

        let orders = await orderModel.find(query);
        return orders;
    }

}

module.exports = OrderService;