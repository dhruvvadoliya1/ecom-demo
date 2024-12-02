const { Schema, model, Types } = require('mongoose')

const logSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required:true
    },
    action: { 
        type: String,
        required:true 
    },
    details: { 
        type: Object,
        required:true
    },
    timestamp: {
        type: Date,
        required:true
    }
  });

module.exports = model('log',logSchema)