import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IProject } from "./project.interface";
import { Projects } from "./project.model";

const createProject = async (payload: IProject) => {
  const projectExists = await Projects.findOne({ title: payload.title });

  if (projectExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Project with this title already exists"
    );
  }

  const project = await Projects.create(payload);
  return project;
};

const getAllProjects = async () => {
  const projects = await Projects.find({ isDeleted: false });

  return projects;
};

const getProjectById = async (projectId: string) => {
  const project = await Projects.findById(projectId);

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const project = await Projects.findByIdAndUpdate(id, payload, { new: true });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

const deleteProject = async (id: string) => {
  const project = await Projects.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
