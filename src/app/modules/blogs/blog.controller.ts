import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const blog = await BlogServices.createBlog(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: blog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await BlogServices.getAllBlogs();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: blogs,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogServices.getBlogById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogServices.updateBlog(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogServices.deleteBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: blog,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
