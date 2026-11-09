import mongoose from "mongoose";

export interface userTypes {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;

  websiteUrl?: string;
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

  websiteUrl?: string;
  phoneno?: string;

  addedBy:object;


  createdAt: Date;
  updatedAt: Date;
}
