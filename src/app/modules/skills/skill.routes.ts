import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SkillValidation } from "./skill.validation";
import { UserRole } from "../User/user.constant";
import { SkillControllers } from "./skil.controller";

const router = express.Router();

router.get("/", SkillControllers.getAllSkills);

router.get("/:id", SkillControllers.getSkillById);

router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(SkillValidation.createSkillSchema),
  SkillControllers.createSkill
);

router.put(
  "/:id",
  auth(UserRole.admin),
  validateRequest(SkillValidation.updateSkillSchema),
  SkillControllers.updateSkill
);

router.delete("/:id", auth(UserRole.admin), SkillControllers.deleteSkill);

export const SkillRoutes = router;
