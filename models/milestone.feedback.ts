import { milestonesFeedbacksTypes } from "@/types/types";
import mongoose, { models } from "mongoose";

const milestonefeedbackSchema = new mongoose.Schema<milestonesFeedbacksTypes>(
  {
    milestone_id: {
      type: String,
      required: true,
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "PROJECTS",
      required: true,
    },
    reviewed_by: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    status: {
        type:String,
        enum:["approved" , "changes_requested"],
    },
    comment: {
        type:String
    },
    reviewed_at: {
        type:String
    },
  },
  {
    timestamps: true,
  },
);

const MILESTONE_FEEDBACKS =
  models?.MILESTONE_FEEDBACKS ||
  mongoose.model("MILESTONE_FEEDBACKS", milestonefeedbackSchema);

export default MILESTONE_FEEDBACKS;
