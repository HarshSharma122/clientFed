/*
/api/projects/findProject/29327834949
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import CLIENTS from "@/models/client.model";
import PROJECTS from "@/models/project.model";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await dbConnect();

    const user = await checkUser();
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        status: 411,
        message: "Id not found",
      });
    }

    const project = await PROJECTS.findOne({ _id: id }).populate({
      path: "client",
      model: CLIENTS,
    });

    if (!project) {
      return NextResponse.json({
        status: 411,
        message: "Project not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: project,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
