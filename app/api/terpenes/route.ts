import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const terpenes = await prisma.terpene.findMany();
  return NextResponse.json(terpenes);
}
