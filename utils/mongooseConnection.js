const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ecom-db.oygug.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = {connectDB, ObjectId};