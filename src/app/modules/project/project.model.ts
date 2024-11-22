import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    projectImg: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    github2: {
      type: String,
      required: false,
    },
    liveLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Projects = model<IProject>("Projects", ProjectSchema);
