/*
/api/projects/milestones/update-milestone
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";

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

    if (user.role != "developer") {
      return NextResponse.json({
        status: "411",
        message: "You are not access to delete the milestone ",
      });
    }

    const {
      title,
      description,
      startdate,
      duedate,
      position,
      client_visibility,
      status,
      completeion_date,
      projectId,
      milestoneId,
    } = await req.json();

    const updatedmilestone = {
      ...(title && { title }),
      ...(description && { description }),
      ...(startdate && { startdate }),
      ...(duedate && { duedate }),
      ...(position && { position }),
      ...(client_visibility && { client_visibility }),
      ...(status && { status }),
      ...(completeion_date && { completeion_date }),
    };

    // await PROJECTS.findOneAndUpdate(
    //   { _id: projectId ,
    //     "milestones._id":milestoneId
    //   },
    //   {
    //     $set:
    //   },
    // );

    return NextResponse.json({
      status: 200,
      message: "Project updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};


// milestone.$.title
