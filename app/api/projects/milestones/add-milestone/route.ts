/*


/api/projects/milestones/add-milestone


*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";

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

    if (user.role != "developer") {
      return NextResponse.json({
        status: 411,
        message: "You are not access to add milestones",
      });
    }

    const {
      title,
      description,
      startdate,
      duedate,
      position,
      client_visibility,
      projectId,
    } = await req.json();

    if (
      !title ||
      !description ||
      !startdate ||
      !projectId ||
      !position ||
      !client_visibility
    ) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    const milestone = {
      title,
      description,
      startdate,
      duedate,
      position,
      client_visibility,
    };
    const project = await PROJECTS.findById(projectId);

    await project.milestones.push(milestone);
    await project.save();

    return NextResponse.json({
      status: 200,
      message: "milestone added!",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
