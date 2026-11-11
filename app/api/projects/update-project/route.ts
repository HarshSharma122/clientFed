/*
/api/projects/update-project
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

    const {
      project_name,
      project_desc,
      project_category,
      project_start_date,
      deadline,
      projectId,
      project_status,
      project_visibility,
    } = await req.json();

    const updatedData = {
      ...(project_name && { project_name }),
      ...(project_desc && { project_desc }),
      ...(project_category && { project_category }),
      ...(project_start_date && { project_start_date }),
      ...(deadline && { deadline }),
      ...(project_status && { project_status }),
      ...(project_visibility && { project_visibility}),
    };
    await PROJECTS.findOneAndUpdate(
      { _id: projectId },
      {
        $set: updatedData,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "Project updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
