import { z } from "zod";

// Create schema for creating a blog post
const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    type: z.string().min(1, "Type is required"),
  }),
});

const updateBlogSchema = createBlogSchema.partial();

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
