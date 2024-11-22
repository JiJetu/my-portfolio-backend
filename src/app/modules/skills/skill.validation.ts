import { z } from "zod";
import { SkillType } from "./skill.constant";

const createSkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  percentage: z
    .number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage cannot exceed 100"),
  skillType: z.nativeEnum(SkillType, {
    errorMap: () => ({ message: "Invalid skill type" }),
  }),
});

const updateSkillSchema = z.object({
  name: z.string().optional(),
  percentage: z.number().min(0).max(100).optional(),
  skillType: z
    .nativeEnum(SkillType, {
      errorMap: () => ({ message: "Invalid skill type" }),
    })
    .optional(),
});

export const SkillValidation = {
  createSkillSchema,
  updateSkillSchema,
};
