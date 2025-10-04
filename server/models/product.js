import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    itemId: { type: String, required: true, unique: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;