/*
/api/clients/update-status
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

    const { id, status } = await req.json();

    await CLIENTS.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
    );

    return NextResponse.json({
      status: 200,
      message: `client ${status} successFully`,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
