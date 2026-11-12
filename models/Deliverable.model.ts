import { commentType, deliverableTypes } from "@/types/types";
import mongoose, { models } from "mongoose";

const commentSchema = new mongoose.Schema<commentType>({
  message:{
    type:String,
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:"USER",
  }

},
{
  timestamps:true
})


const deliverableSchema = new mongoose.Schema<deliverableTypes>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    comments: [commentSchema],
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "changes_requested"],
      default: "draft",
    },
    version_number: {
      type: Number,
      required: true,
    },
    file_url: {
      type: String,
    },
    external_url: {
      type: String,
    },
    notes: {
      type: String,
    },
    uploaded_by:{
      type: mongoose.Types.ObjectId,
      ref: "USER",
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "PROJECTS",
    },
  },
  {
    timestamps: true,
  },
);

const DELIVERABLE =
  models?.DELIVERABLE || mongoose.model("DELIVERABLE", deliverableSchema);
export default DELIVERABLE;
