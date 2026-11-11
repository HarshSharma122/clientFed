import mongoose from "mongoose";

export interface userTypes {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;

  websiteurl?: string;
  phoneno?: string;

  role?: string;
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


  client:object;
  addedBy: object;
  createdAt: Date;
  updatedAt: Date;
}
