import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controller/product.js';
import { authMiddleware, checkApprovedStatus } from '../midddleware/auth.js';

const productRouter = express.Router();


productRouter.use(authMiddleware); // must be logged in
productRouter.use(checkApprovedStatus); // must be approved

productRouter.post("/", addProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/:id", getSingleProduct)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

export default productRouter;