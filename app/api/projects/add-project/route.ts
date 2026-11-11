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
      project_start_date,
      preview_URL,
      client,
      deadline,
      project_cover_img,
    } = await req.json();

    if (
      !project_name ||
      !project_desc ||
      !project_category ||
      !project_start_date ||
      !preview_URL ||
      !client
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
      project_start_date,
      preview_URL,
      client,
      deadline,
      project_cover_img,
      addedBy: user._id,
    });

    return NextResponse.json({
      status: 200,
      message: "proejct added!",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
