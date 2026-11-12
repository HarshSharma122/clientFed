/*
/api/clients/update-status
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";
import FEEDBACKS from "@/models/feedback.model";

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();

    const user = await checkUser();
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }
    if(user.role!="client"){
        
        return NextResponse.json({
          status: 411,
          message: "You are not valid user for delete the feedback",
        });
    }

    const { feedbackId } = await req.json();

    await FEEDBACKS.findOneAndDelete({ _id: feedbackId });

    return NextResponse.json({
      status: 200,
      message: "feedback deleted successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
