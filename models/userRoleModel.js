const mongoose = require('mongoose');

const userRolesSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserRoles', userRolesSchema);
