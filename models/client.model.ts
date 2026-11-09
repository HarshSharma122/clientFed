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
    },
    companyname: {
      type: String,
      required: true,
    },

    websiteUrl: { type: String },
    phoneno: { type: String},

    addedBy: {
      type: mongoose.Types.ObjectId,
      ref:"USER",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


const CLIENTS = models?.CLIENTS || mongoose.model("CLIENTS", clientSchema);

export default CLIENTS;
