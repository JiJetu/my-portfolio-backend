import { Blogs } from "./blog.model";
import { IBlog } from "./blog.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createBlog = async (payload: IBlog) => {
  const blogExists = await Blogs.findOne({ title: payload.title });

  if (blogExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Blog with this title already exists"
    );
  }

  const blog = await Blogs.create(payload);
  return blog;
};

const getAllBlogs = async () => {
  const blogs = await Blogs.find({ isDeleted: false });
  return blogs;
};

const getBlogById = async (id: string) => {
  const blog = await Blogs.findOne({ _id: id, isDeleted: false });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const blog = await Blogs.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true }
  );

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
};

const deleteBlog = async (id: string) => {
  const blog = await Blogs.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
