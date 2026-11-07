/*

/api/Auth/logout

*/

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
   
    const cookie = await cookies();
    cookie.delete("auth-token");

    return NextResponse.json({
      status: 200,
      message: "Logout successFully done",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
