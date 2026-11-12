/*
/api/projects/milestones/feedback/add-feedback
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import MILESTONE_FEEDBACKS from "@/models/milestone.feedback";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }

    // only client can add this milestone feedback

    if (user.role != "client") {
      return NextResponse.json({
        status: 411,
        message: "You are not access to add the feedback",
      });
    }
    const { milestone_id, project_id, comment, reviewed_at } = await req.json();

    if (!milestone_id || !project_id || !comment || !reviewed_at) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    const feedback = {
      milestone_id,
      project_id,
      reviewed_by: user._id,
      comment,
      reviewed_at,
    };
    await MILESTONE_FEEDBACKS.create(feedback);

    return NextResponse.json({
      status: 200,
      message: "Feedback added to milestones ",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
