import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const createSkill = catchAsync(async (req, res) => {
  const skill = await SkillServices.createSkill(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill created successfully",
    data: skill,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const skills = await SkillServices.getAllSkills();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully",
    data: skills,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const skill = await SkillServices.getSkillById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill retrieved successfully",
    data: skill,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const skill = await SkillServices.updateSkill(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully",
    data: skill,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const skill = await SkillServices.deleteSkill(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill deleted successfully",
    data: skill,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
