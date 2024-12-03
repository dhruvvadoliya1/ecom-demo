const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: { 
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    token: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user',
    },
    deletedAt: {
        type: Date,
        default: null
    }
  },{ timestamps: true });

module.exports = model('user',userSchema)