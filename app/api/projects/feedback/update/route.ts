/*
/api/projects/feedback/update
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import FEEDBACKS from "@/models/feedback.model";

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

    if(user.role!="client"){
        return NextResponse.json({
        status: 411,
        message: "You are not valid user for updating the feedback",
      })
    }
    const {
      title,
  description,
  priority,
  feedbackId
    } = await req.json();

    const updatedData = {
      ...(title && { title }),
      ...(description && {description }),
      ...(priority && { priority }),
    };

    await FEEDBACKS.findOneAndUpdate(
      { _id:  feedbackId},
      {
        $set: updatedData,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "feedback updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
