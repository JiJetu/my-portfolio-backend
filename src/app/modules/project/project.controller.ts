import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.services";

const createProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.createProject(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: project,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await ProjectServices.getAllProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: projects,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await ProjectServices.getProjectById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await ProjectServices.updateProject(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await ProjectServices.deleteProject(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: project,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
