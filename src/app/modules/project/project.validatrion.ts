import { z } from "zod";

const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    technology: z.string().min(1, "Technology is required"),
    projectImg: z.string().url("Project image must be a valid URL"),
    github: z.string().url("GitHub link must be a valid URL"),
    github2: z.string().url("GitHub2 link must be a valid URL").optional(),
    liveLink: z.string().url("Live link must be a valid URL"),
  }),
});

const updateProjectSchema = createProjectSchema.partial();

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
