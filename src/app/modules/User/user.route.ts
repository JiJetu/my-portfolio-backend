import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "./user.constant";
import { UserController } from "./user.controller";

const router = express.Router();

// router.get("/", auth(UserRole.admin), UserController.getAllUser);

router.get("/my-info", auth(UserRole.admin), UserController.getUser);

// router.put(
//   "/:userId",
//   auth(UserRole.admin, UserRole.user),
//   validateRequest(UserValidations.updateUserValidationSchema),
//   UserController.updateUser
// );

export const UserRoutes = router;
