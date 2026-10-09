import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";

const router = Router();
const controller = new ProductController();

router.get("/getAll", controller.getAllProducts);
router.get("/getById/:id", controller.getProductById);
router.post("/create", controller.createProduct);
router.put("/update/:id", controller.updateProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.patch("/change-price/:id", controller.changePrice);

export default router;