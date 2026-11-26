/// /api/clients/find-client-by-email

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { checkUser } from "@/utils/checkuser";
import CLIENTS from "@/models/client.model";
import PROJECTS from "@/models/project.model";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const user = await checkUser();

    if (!user) {
      return NextResponse.json(
        { message: "Please login first" ,
         status: 401 },
      );
    }

    const { email, projectId } = await req.json();

    if (!email || !projectId) {
      return NextResponse.json(
        { message: "Email and project ID are required" ,  status: 400 },
      );
    }

    // Find client
    const findClient = await CLIENTS.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!findClient) {
      return NextResponse.json({
        message: "Client not found. Please add the client first.",
        status: 404,
      });
    }

    // Find project owned by the logged-in user
    const findProject = await PROJECTS.findOne({
      _id: projectId,
      addedBy: user._id,
    });

    if (!findProject) {
      return NextResponse.json(
        { message: "Project not found" , status: 404 },
      );
    }

    // Check if project already has a client
    if (findProject.client) {
      return NextResponse.json(
        { message: "This project already has a client" , status: 409 },
      );
    }

    // Attach client to project
    findProject.client = findClient._id;
    await findProject.save();

    return NextResponse.json(
      { message: "Client added to project successfully" ,  status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" , status: 500 },
    );
  }
};
