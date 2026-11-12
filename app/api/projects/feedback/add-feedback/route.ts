/*
/api/projects/add-feedback
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";
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

    if (user.role != "client") {
      return NextResponse.json({
        status: 411,
        message: "You are not access to add the feedback",
      });
    }
    const {
       title,
        description,
        priority,
        projectId
       } = await req.json();

    if (
      !title ||
      !description ||
      !priority || 
      !projectId
    ) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }


    const feedback = {
        title,
        description,
        priority,
        addedBy:user._id,
        projectId
    }
    const response = await FEEDBACKS.create(feedback);



    return NextResponse.json({
      status: 200,
      message: "Feedback added! get response back with in hours",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
