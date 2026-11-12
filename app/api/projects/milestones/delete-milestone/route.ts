/*


/api/projects/milestones/delete-milestones


*/

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import PROJECTS from "@/models/project.model";

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();

    const user = await checkUser();
    if (!user) {
      return NextResponse.json({
        status: 411,
        message: "Please login first",
      });
    }


    if(user.role != "developer"){
        return NextResponse.json({status:"411", message:"You are not access to delete the milestone "})
    }




    const {projectId, milestoneId } = await req.json();





    // pull means automatically remove milestone whose id is equal to milestoneId
    await PROJECTS.findOneAndUpdate({ _id: projectId }, {
        $pull:{
            milestones:{
                _id:milestoneId
            }
        }
    });

    return NextResponse.json({
      status: 200,
      message: "Milestone deleted successFully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server Error" });
  }
};
