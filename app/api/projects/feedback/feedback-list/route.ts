/*
/api/projects/feedback/feedback-list
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import FEEDBACKS from "@/models/feedback.model";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const user = await checkUser(); // it helps to check wheather you are authenticated or not
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }

    const { projectId } = await req.json();

    const response = await FEEDBACKS.find({ projectId: projectId });

    if (!response) {
      return NextResponse.json({
        status: 411,
        message: "feedbacks not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: response,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
