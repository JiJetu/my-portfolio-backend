import express from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { UserRole } from "../User/user.constant";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getProductById);

router.post(
  "/",
  auth(UserRole.admin),
  multerUpload.single("image"),
  ProductControllers.createProduct
);

router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct
);

router.delete("/:id", auth(UserRole.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
