const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    id: {
        type: Number
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    name: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', StoreSchema);