/*
this route is for signUp when user comes first time to clientfed just give username, email, password then create a account 
simple process is simple in this we first check with email wheather the user is already exist or not 

if exist then return initily with the message that already have an account with this email please try with different one 



and also we convert normal password text to hasehd password with salt and we use bcrypt librray to prevent rainbow table attack use salt 


/api/Auth/signup

*/

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import USER from "@/models/user.model";
import { signupzod } from "@/zod/zod.schema";
import dbConnect from "@/lib/db";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const secret = process.env.secret_token!;
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();


    const cookie = await cookies();
    const { data, success, error }: any = signupzod.safeParse(await req.json());
    if (!success) {
      return NextResponse.json({
        status: 411,
        message: "Incorrect inputs",
        error: JSON.parse(error),
      });
    }

    const { username, email, password } = data;

    if (!username || !email || !password) {
      return NextResponse.json({
        status: 411,
        message: "Input field is required",
      });
    }

    // check this user is already exist or not

    const existuser = await USER.findOne({ email: email });

    if (existuser) {
      return NextResponse.json({
        status: 411,
        message: "user is already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // for convert normal text to hashed password

    const user = await USER.create({
      username,
      email,
      password: hashedPassword,
    });




    // create a token 
    const token = jwt.sign({
      userId:user._id
    },secret);



    // we have two ways first send this token to browser and store implictly into local storage
    // but for nextjs at first render it is not possible to get the localstorage 
    // data so second way is to store the token into cookie
    // it automaticaaly send the cookie on every request 
    // now we follow the second method 


    cookie.set('auth-token', token, {
      httpOnly:true,
      sameSite:"lax",
      maxAge:7*24*60*60
    })













    return NextResponse.json({
      status: 200,
      message: "Account has been created",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
