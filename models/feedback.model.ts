import { commentType, feedbacksTypes } from "@/types/types";
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


const feedbackSchema = new mongoose.Schema<feedbacksTypes>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
  },
  comments:[commentSchema],
  status: {
    type: String,
    enum: ["open", "in-progress", "done", "closed"],
    default:"open"
  },
  developerResponse: {
    type: String,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "USER",
  },
  projectId:{
    type: mongoose.Types.ObjectId,
    ref: "PROJECTS",

  }
},{
 
  timestamps:true
});



const FEEDBACKS = models?.FEEDBACKS || mongoose.model("FEEDBACKS", feedbackSchema);

export default FEEDBACKS;
