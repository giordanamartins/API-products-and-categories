const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/auth');

const Category = require('../models/category');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (await Category.findOne({ name })) {
            return res.status(400).send({ error: 'Category already exists.' });
        }

        const category = await Category.create(req.body);

        return res.status(201).send({
            message: 'Category registered successfully!',
            category,
        });
    } 
    catch (err) {
        return res.status(400).send({ error: 'Error creating category.', details: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).send(categories);
    } 
    catch (err) {
        return res.status(400).send({ error: 'Error fetching categories.', details: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ error: 'Invalid category ID.' });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        return res.status(200).send(category);
    } 
    catch (err) {
        return res.status(400).send({ error: 'Error fetching category.', details: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ error: 'Invalid category ID.' });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();

        return res.status(200).send({
            message: 'Category updated successfully!',
            category,
        });
    } 

    catch (err) {
        return res.status(400).send({ error: 'Error updating category.', details: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ error: 'Invalid category ID.' });
        }

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        return res.status(200).send({ message: 'Category deleted successfully!' });
    } 
    catch (err) {
        return res.status(400).send({ error: 'Error deleting category.', details: err.message});
    }
});

module.exports = app => app.use('/category', router);
