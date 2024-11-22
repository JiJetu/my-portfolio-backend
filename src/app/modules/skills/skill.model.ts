import { Schema, model } from "mongoose";
import { ISkill } from "./skill.interface";
import { SkillType } from "./skill.constant";

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skillType: {
      type: String,
      required: true,
      enum: Object.values(SkillType),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Skills = model<ISkill>("Skills", SkillSchema);
