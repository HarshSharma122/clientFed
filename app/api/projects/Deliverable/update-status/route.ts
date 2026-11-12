/*
/api/projects/Deliverable/update-status
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import DELIVERABLE from "@/models/Deliverable.model";

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
        status: 411,
        message: "You are not valid user for update....",
      });
    }



    const { status, deliverableId} = await req.json();

    await DELIVERABLE.findOneAndUpdate(
      { _id: deliverableId },
      {
        status: status,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "status updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
