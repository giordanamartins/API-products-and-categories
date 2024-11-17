const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    categories: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    }],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
