/*
/api/clients/add-client
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import CLIENTS from "@/models/client.model";

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

    const { clientname, email, companyname, phoneno, websiteurl } =
      await req.json();
    if (!clientname || !phoneno || !companyname || !email) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    await CLIENTS.create({
      clientname,
      email,
      companyname,
      phoneno,
      websiteurl,
      addedBy:user._id
    });

    return NextResponse.json({
      status: 200,
      message: "client added!",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};



