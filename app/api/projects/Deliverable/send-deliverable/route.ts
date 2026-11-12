/*
/api/projects/Deliverable/send-deliverable
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import DELIVERABLE from "@/models/Deliverable.model";

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
        msg: "You are not access to add this....",
      });
    }

    const {
      title,
      description,
      version_number,
      file_url,
      external_url,
      notes,
      projectId,
    } = await req.json();

    if (!title || !description || !version_number || !notes || !projectId) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    await DELIVERABLE.create({
      title,
      description,
      version_number,
      file_url,
      external_url,
      notes,
      uploaded_by: user._id,
      projectId,
    });

    return NextResponse.json({
      status: 200,
      message: "sended to client!",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
