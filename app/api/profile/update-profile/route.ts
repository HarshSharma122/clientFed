/*
/api/profile/update-profile
*/

import { NextRequest, NextResponse } from "next/server";
import USER from "@/models/user.model";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";

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

    const { username, phoneno, websiteUrl, email } = await req.json();

    const updatedData = {
      ...(username && { username }),
      ...(phoneno && { phoneno }),
      ...(websiteUrl && { websiteUrl }),
      ...(email && { email }),
    };
    await USER.findOneAndUpdate(
      { _id: user._id },
      {
        $set: updatedData,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "Profile updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
