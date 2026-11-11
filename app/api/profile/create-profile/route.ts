/*
/api/profile
*/

import { NextRequest, NextResponse } from "next/server";
import USER from "@/models/user.model";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";

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

    const { name, phoneno, websiteurl } = await req.json();
    if (!name || !phoneno || !websiteurl) {
      return NextResponse.json({
        status: 411,
        message: "Incorrect inputs",
      });
    }





    await USER.findOneAndUpdate({_id:user._id}, {
        username:name,
        phoneno,
        websiteurl
    })


    return NextResponse.json({
      status: 200,
      message: "Profile is successFully created",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
