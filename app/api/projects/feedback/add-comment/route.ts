/*
/api/projects/feedback/add-comment
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import FEEDBACKS from "@/models/feedback.model";

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

    const { message, feedbackId } = await req.json();

    if (!message || !feedbackId) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    const comments = {
      message,
      user:user._id
    };
    const response = await FEEDBACKS.findOne({
      _id: feedbackId,

    });

    await response.comments.push(comments);

    await response.save();

    return NextResponse.json({
      status: 200,
      message: "comment added",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
