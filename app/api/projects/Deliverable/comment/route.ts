// client will comment on deliverbla item so thatr user can change 

/*
/api/projects/Deliverable/comment
*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import FEEDBACKS from "@/models/feedback.model";
import DELIVERABLE from "@/models/Deliverable.model";

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
    
    
    if(user.role!= "client"){
        return NextResponse.json({
          status: 411,
          message: "you are not valid user for comment.....",
        });
    }


    const { message,deliverableId} = await req.json();

    if (!message || !deliverableId) {
      return NextResponse.json({
        status: 411,
        message: "Required Input",
      });
    }

    const comments = {
      message,
      user:user._id
    };
    const response = await DELIVERABLE.findOne({
      _id: deliverableId,

    });

    await response.comments.push(comments);

    await response.save();

    return NextResponse.json({
      status: 200,
      message: "comment added",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
