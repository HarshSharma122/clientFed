/*
/api/projects/project-list
*/

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";

export const GET = async () => {
  try {
    await dbConnect();

    const user = await checkUser(); // it helps to check wheather you are authenticated or not
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }

    const response = await PROJECTS.find({ addedBy: user._id });

    if (!response) {
      return NextResponse.json({
        status: 411,
        message: "project not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: response,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
