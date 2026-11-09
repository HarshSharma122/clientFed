/*
/api/profile/user-details
*/

import { NextResponse } from "next/server";
import USER from "@/models/user.model";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";

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

    const response = await USER.findOne({ _id: user._id }).select("username email websiteUrl phoneno");

    if (!response) {
      return NextResponse.json({
        status: 411,
        message: "user not found",
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
