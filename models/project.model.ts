import { milestonesType, projectTypes } from "@/types/types";
import mongoose, { models } from "mongoose";

const milestonesSchema = new mongoose.Schema<milestonesType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [ "upcoming" ,  "in_progress" , "waiting_for_client" , "completed" , "delayed"],
    required: true,
    default:"upcoming"
  },

  position: {
    type: Number,
    required: true,
    
  },
  client_visibility: {
    type: Boolean,
    required: true,
    default:false
  },
  completeion_date: {
    type: Date,
    required: true,
  },
});

const projectSchema = new mongoose.Schema<projectTypes>(
  {
    project_name: {
      type: String,
      required: true,
    },
    project_desc: {
      type: String,
      required: true,
    },
    project_category: {
      type: String,
      required: true,
    },
    project_start_date: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
    }, // optinal
    preview_URL: {
      type: String,
      required: true,
    },

    project_status: {
      type: String,
      enum: [
        "draft",
        "not-started",
        "in-progress",
        "waiting-for-client",
        "in-review",
        "on-hold",
        "cancelled",
      ],
      default: "draft",
      required: true,
    },

    project_visibility: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
      required: true,
    },

    project_cover_img: {
      type: String,
    }, // optinal

    client: {
      type: mongoose.Types.ObjectId,
      ref: "CLIENTS",
      required: true,
    },

    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    milestones:[milestonesSchema]
  },
  {
    timestamps: true,
  },
);

const PROJECTS = models?.PROJECTS || mongoose.model("PROJECTS", projectSchema);

export default PROJECTS;
