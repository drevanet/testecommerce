import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const schema = z.object({email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(1).max(128)});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({error:"Enter a valid email and password."},{status:400});
    const user = await prisma.user.findUnique({where:{email:parsed.data.email}});
    if (!user || !(await bcrypt.compare(parsed.data.password,user.passwordHash))) return NextResponse.json({error:"Email or password is incorrect."},{status:401});
    const session = await getSession();
    session.user = {id:user.id,name:user.name,email:user.email};
    await session.save();
    return NextResponse.json({ok:true});
  } catch(error) {
    console.error("Login error",error);
    return NextResponse.json({error:"Unable to sign in right now."},{status:500});
  }
}
