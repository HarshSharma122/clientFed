/*
/api/projects/add-project
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

    const {
      project_name,
      project_desc,
      project_category,
      preview_URL,
      deadline,
    } = await req.json();

    if (
      !project_name ||
      !project_desc ||
      !project_category
    ) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    await PROJECTS.create({
      project_name,
      project_desc,
      project_category,
      preview_URL,
      deadline,
      addedBy: user._id,
    });

    return NextResponse.json({
      status: 202,
      message: "project added!",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
