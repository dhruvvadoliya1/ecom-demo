const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: { 
        type: String,
        required: true 
    },
    price: { 
        type: Number,
        required:true
    },
    stock: { 
        type: Number,
        required:true
    },
    category: {
        type: String,
        default: null,
        // require:true
    },
    tags:  {
        type: String,
        default: null,
    },
    userId: {
        type: String, 
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
  }, { timestamps: true });

module.exports = model('product', productSchema)