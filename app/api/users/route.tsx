import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// import schema from "./schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // // 데이터 검증
  // const validation = schema.safeParse(body);
  // if (!validation.success) {
  //   return NextResponse.json(validation.error.errors, { status: 404 });
  // }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // 새로운 사용자 생성
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser);
}
