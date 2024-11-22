import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.get("/", BlogControllers.getAllBlogs);
router.get("/:id", BlogControllers.getBlogById);

router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(BlogValidation.createBlogSchema),
  BlogControllers.createBlog
);

router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(BlogValidation.updateBlogSchema),
  BlogControllers.updateBlog
);

router.delete("/:id", auth(UserRole.admin), BlogControllers.deleteBlog);

export const BlogRoutes = router;
