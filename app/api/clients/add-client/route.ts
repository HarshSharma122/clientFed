/*
/api/clients/add-client
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import CLIENTS from "@/models/client.model";
import crypto from "crypto";
import USER from "@/models/user.model";

/*

suno ab ek cheej h jaise maine ek email daal rkhi h 

ab m apne users ki list m check krunag ki bhai ye email user list m h and uska role agr client nhi h jo m is email ko add nhi krunga 



agr role client h message send krenge bhai is email se pehel se hi client exist krta h toh m kya krunga tb m without createeing the 


toh bo client alreay meri list m hoga toh m automatically usko apne project m adffd kr dunga 

*/

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

    // check this email in users collection

    const existUser = await USER.findOne({
      email: email,
    });
    if (existUser.role == "user") {
      return NextResponse.json({
        status: 411,
        message:
          "this email is already exist for user you can not add this for client....",
      });
    }

    if (existUser.role == "client") {
      return NextResponse.json({
        status: 411,
        message: "this client is already exist with this email...",
      });
    }

    const findClient = await CLIENTS.findOne({ email: email });

    if (findClient && findClient.invitationstatus != "accepted") {
      return NextResponse.json({
        status: 411,
        message:
          "Already exist this client but invitation is not accepted till now",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await CLIENTS.create({
      clientname,
      email,
      companyname,
      phoneno,
      websiteurl,
      addedBy: user._id,
      invitationLink: tokenHash,
    });

    return NextResponse.json({
      status: 200,
      message: "client added!",
      invitationLink: `${process.env.FRONTEND_URL}/invite/${token}`,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error });
  }
};
