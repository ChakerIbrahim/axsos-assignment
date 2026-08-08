const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
};