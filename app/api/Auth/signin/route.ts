/*

/api/Auth/signin

*/

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import USER from "@/models/user.model";
import { signinzod } from "@/zod/zod.schema";
import dbConnect from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";




const secret = process.env.secret_token!;
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const cookie = await cookies();
    const { data, success, error }: any = signinzod.safeParse(await req.json());
    if (!success) {
      return NextResponse.json({
        status: 411,
        message: "Incorrect inputs",
        error: JSON.parse(error),
      });
    }

    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json({
        status: 411,
        message: "Input field is required",
      });
    }

    const existuser = await USER.findOne({ email: email });

    if (!existuser) {
      return NextResponse.json({
        status: 411,
        message: "user is not exit",
      });
    }

    const check = await bcrypt.compare(password, existuser.password);

    if (!check) {
      return NextResponse.json({
        status: 411,
        message: "The credentials is wrong",
      });
    }

    // create a token
    const token = jwt.sign(
      {
        userId: existuser._id,
      },
      secret,
    );

    // we have two ways first send this token to browser and store implictly into local storage
    // but for nextjs at first render it is not possible to get the localstorage
    // data so second way is to store the token into cookie
    // it automaticaaly send the cookie on every request
    // now we follow the second method

    cookie.set("auth-token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      status: 200,
      message: "Login successFully done",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
