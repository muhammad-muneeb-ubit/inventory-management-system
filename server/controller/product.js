import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    // const { name, price, quantity } = req.body;
    // const newProduct = new Product({ name, price, quantity });
    // await newProduct.save();
    // res.status(201).json({ status: true, message: "Product added successfully", product: newProduct });
    // or simply
    const body = req.body;
    const product = await Product.create(body);
    console.log("product", product);
    res
      .status(201)
      .json({ status: true, message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to add product",
        error: error.message,
      });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        status: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to retrieve products",
        error: error.message,
      });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Product fetched successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to retrieve product",
        error: error.message,
      });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete product ",
      error: error.message,
    });
  }
};
