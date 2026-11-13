import mongoose from "mongoose";

export interface userTypes {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;

  websiteurl?: string;
  phoneno?: string;

  role?: string;
  plan:"free" | "pro";
  createdAt: Date;
  updatedAt: Date;
}
export interface clientTypes {
  _id: mongoose.Types.ObjectId;
  clientname: string;
  email: string;
  companyname: string;

  websiteurl?: string;
  phoneno?: string;

  addedBy: object;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface projectTypes {
  _id: mongoose.Types.ObjectId;
  project_name: string;
  project_desc: string;
  project_category: string;
  project_start_date: string;
  deadline: string;
  preview_URL: string;
  project_status: string;
  project_visibility: string;
  project_cover_img: string;

  milestones: [milestonesType];

  client: object;
  addedBy: object;

  createdAt: Date;
  updatedAt: Date;
}
export interface feedbacksTypes {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  status: string;
  developerResponse: string;
  comments: [commentType];
  addedBy: object;
  projectId: object;
  createdAt: Date;
  updatedAt: Date;
}

export interface commentType {
  message: string;
  user: object;
}

// project milestones

export interface milestonesType {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  startdate: Date;
  duedate: Date;
  status:
    | "upcoming"
    | "in_progress"
    | "waiting_for_client"
    | "completed"
    | "delayed";

  position: number;
  client_visibility: boolean;
  completeion_date: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface milestonesFeedbacksTypes {
  _id: mongoose.Types.ObjectId;
  milestone_id: string;
  project_id: Object;
  reviewed_by: Object;
  status: "approved" | "changes_requested";
  comment: string;
  reviewed_at: string;

  createdAt: Date;
  updatedAt: Date;
}

// deliverable

export interface deliverableTypes {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "changes_requested";
  version_number: number;
  file_url: string;
  external_url: string;
  notes: string;
  comments: [commentType];
  uploaded_by: object;
  projectId: object;

  createdAt: Date;
  updatedAt: Date;
}
