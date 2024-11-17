const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/auth');

const Product = require('../models/product');
const Category = require('../models/category');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        const { name, description, amount, price, categories } = req.body;

        if (categories) {
            for (const categoryId of categories) {
                if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                    return res.status(400).send({ error: `Invalid category ID: ${categoryId}.`, details: err.message });
                }
                const categoryExists = await Category.findById(categoryId);
                if (!categoryExists) {
                    return res.status(404).send({ error: `Category not found: ${categoryId}.`, details: err.message });
                }
            }
        }

        const product = await Product.create({ 
            name, 
            description, 
            amount, 
            price, 
            categories 
        });

        if (req.body.categories && req.body.categories.length > 0) {
            await Category.updateMany(
                { _id: { $in: req.body.categories } },
                { $push: { products: product._id } }
            );
        }        

        return res.status(201).send({ message: 'Product created successfully!', product });
    } 
    catch (err) {
        return res.status(500).send({ error: 'Error creating product.', details: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('categories');

        return res.status(200).send(products);
    } 
    catch (err) {
        return res.status(500).send({ error: 'Error fetching products.', details: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product ID.' });
        }

        const product = await Product.findById(productId).populate('categories');

        if (!product) {
            return res.status(404).send({ error: 'Product not found.' });
        }

        return res.status(200).send(product);
    } 
    catch (err) {
        return res.status(500).send({ error: 'Error fetching product.', details: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, amount, price, categories } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product ID.' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ error: 'Product not found.' });
        }

        if (categories) {
            for (const categoryId of categories) {
                if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                    return res.status(400).send({ error: `Invalid category ID: ${categoryId}.` });
                }
                const categoryExists = await Category.findById(categoryId);
                if (!categoryExists) {
                    return res.status(404).send({ error: `Category not found: ${categoryId}.` });
                }
            }
        }

        Object.assign(product, { name, description, amount, price, categories });
        await product.save();

        return res.status(200).send({ message: 'Product updated successfully!', product });
    } 
    catch (err) {
        return res.status(500).send({ error: 'Error updating product.', details: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product ID.' });
        }

        const product = await Product.findByIdAndDelete(productId);
        
        if (!product) {
            return res.status(404).send({ error: 'Product not found.' });
        }

        return res.status(200).send({ message: 'Product deleted successfully!' });

    } 
    catch (err) {
        return res.status(500).send({ error: 'Error deleting product.', details: err.message });
    }
});

module.exports = app => app.use('/product', router);
