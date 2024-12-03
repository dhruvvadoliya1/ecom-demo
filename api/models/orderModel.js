const { Schema, model, Types } = require('mongoose')
const { ORDER_STATUS } = require('../enums');

const productSchema = new Schema({
    productId: {
        type: Types.ObjectId,
        required:true,
        ref: 'product'
    },
    quantity: { 
        type: Number,
        required:true
    }
  });

const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required:true,
        ref: 'user'
    },
    products: [productSchema],
    totalAmount: { 
        type: Number,
        required:true
    },
    status: { 
        type: String,
        enums: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING,
    }
  }, { timestamps: true });
  
module.exports = model('order',orderSchema)