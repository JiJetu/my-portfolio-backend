import express from "express";
import { ProjectControllers } from "./project.controller";

const router = express.Router();

router.get("/", ProjectControllers.getAllCategories);

router.get("/:id", CategoryControllers.getCategoryById);

router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory
);

router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory
);

router.delete("/:id", auth(UserRole.admin), CategoryControllers.deleteCategory);

export const ProjectRoutes = router;
