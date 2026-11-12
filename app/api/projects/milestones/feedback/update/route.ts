/*
/api/projects/milestones/feedback/update
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import MILESTONE_FEEDBACKS from "@/models/milestone.feedback";

export const PATCH = async (req: NextRequest) => {
  try {
    await dbConnect();

    const user = await checkUser();
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }

    if (user.role == "client") {
      return NextResponse.json({
        status: 411,
        message: "You are not valid user for update the status",
      });
    }
    const { status, feedbackId } = await req.json();

    await MILESTONE_FEEDBACKS.findOneAndUpdate(
      { _id: feedbackId },
      {
        status: status,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "feedback status updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
