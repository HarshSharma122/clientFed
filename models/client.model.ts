import { clientTypes } from "@/types/types";
import mongoose, { models } from "mongoose";

const clientSchema = new mongoose.Schema<clientTypes>(
  {
    clientname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    websiteurl: { type: String },
    phoneno: { type: String },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    invitationstatus: {
      type: String,
      enum: ["accept", "declined"],
    },
    invitationLink: {
      type: String,
      required: true,
    },

    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CLIENTS = models?.CLIENTS || mongoose.model("CLIENTS", clientSchema);

export default CLIENTS;
