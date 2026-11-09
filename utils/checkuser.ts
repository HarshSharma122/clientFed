import { cookies } from "next/headers"; // it is server side file
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import USER from "@/models/user.model";
export const checkUser = async () => {
  await dbConnect();
  const secret_token = process.env.secret_token!;
  const cookie = await cookies();
  const findtoken = cookie.get("auth-token")?.value;
  if (!findtoken) {
    return null;
  }

  // now verify the token using jwt

  const jwtverification: any = jwt.verify(findtoken, secret_token);

  if (!jwtverification) {
    return null;
  }

  const userId = jwtverification.userId; // we get the userid here using jwt 

  const user = USER.findOne({
    _id: userId,
  });

  if (!user) {
    return null;
  }

  return user;
};
