/*
/api/clients/update-client-details
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import CLIENTS from "@/models/client.model";

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

    const { clientname, email, companyname, phoneno, websiteurl, id } =
      await req.json();

    const updatedData = {
      ...(clientname && { clientname }),
      ...(phoneno && { phoneno }),
      ...(companyname && { companyname }),
      ...(websiteurl && { websiteurl }),
      ...(email && { email }),
    };
    await CLIENTS.findOneAndUpdate(
      { _id: id },
      {
        $set: updatedData,
      },
    );

    return NextResponse.json({
      status: 200,
      message: "client detail updated successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
