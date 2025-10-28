import productController from "../controller/productController.js";
import { Router } from "express";
import { validateSchema } from "../middlewares/validationMiddlewares.js";
import { productSchema } from "../schema/validateSchema.js"

const router = Router()

router.get("/produtos", productController.findAllProductController)
router.get("/by-name", productController.searchProductControllerByName)
router.get("/by-category", productController.searchProductControllerByCategory)
router.post("/produtos", validateSchema(productSchema), productController.createProductController)
router.patch("/produtos/:id", validateSchema(productSchema), productController.updateProductController)
router.delete("/produtos/:id", productController.deleteProductController)

export default router
