import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestedId = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id: requestedId },
  });
  if (!user) {
    return NextResponse.json({ error: "USER NOT FOUND" }, { status: 404 });
  }

  return NextResponse.json(user);
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  //   const validation = schema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.errors, { status: 404 });
  //   }

  const requestedId = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id: requestedId },
  });

  if (!user) {
    return NextResponse.json({ error: "USER NOT FOUND" }, { status: 404 });
  }

  const uadatedUser = await prisma.user.update({
    where: { id: requestedId },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(uadatedUser);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestedId = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id: requestedId },
  });

  if (!user) {
    return NextResponse.json({ error: "USER NOT FOUND" }, { status: 404 });
  }

  await prisma.user.delete({ where: { id: requestedId } });

  return NextResponse.json({});
}
