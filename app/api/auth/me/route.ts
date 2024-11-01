import { authOptions } from "@/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        fullName: true,
        email: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("auth me =>", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
