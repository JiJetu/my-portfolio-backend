import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ISkill } from "./skill.interface";
import { Skills } from "./skill.model";

const createSkill = async (payload: ISkill) => {
  const skillExists = await Skills.findOne({ name: payload.name });

  if (skillExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Skill with this name already exists"
    );
  }

  const skill = await Skills.create(payload);
  return skill;
};

const getAllSkills = async () => {
  const skills = await Skills.find({ isDeleted: false });

  return skills;
};

const getSkillById = async (id: string) => {
  const skill = await Skills.findById(id);

  if (!skill || skill.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  return skill;
};

const updateSkill = async (id: string, payload: Partial<ISkill>) => {
  const skill = await Skills.findByIdAndUpdate(id, payload, { new: true });

  if (!skill || skill.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  return skill;
};

const deleteSkill = async (id: string) => {
  const skill = await Skills.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  return skill;
};

export const SkillServices = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
