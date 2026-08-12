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

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    return res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const deleteProduct = async(req,res)=>{
  try {
    const deleteConfirmation = await Product.deleteOne({ _id: req.params.id});
    return res.json(deleteConfirmation);
  } catch(err) {
    return res.json(err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};