const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });
        res.json(product);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.createProduct = async (req, res) => {
    const {
        product_name,
        product_type,
        price,
        unit
    } = req.body;
    const product = new Product({
        product_name,
        product_type,
        price,
        unit
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });
        const data = {
            $set: req.body
        };
        const upDated = await Product.findByIdAndUpdate(id, data);
        res.json(upDated);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });
        const deLete = await Product.findByIdAndDelete(id);
        res.json(deLete);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};