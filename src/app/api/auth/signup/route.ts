import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254).transform(v=>v.toLowerCase()),
  password: z.string().min(8).max(128)
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({error:"Please provide a valid name, email, and password of at least 8 characters."},{status:400});
    const {name,email,password} = parsed.data;
    const existing = await prisma.user.findUnique({where:{email}});
    if (existing) return NextResponse.json({error:"An account with this email already exists."},{status:409});
    const user = await prisma.user.create({data:{name,email,passwordHash:await bcrypt.hash(password,12)}});
    const session = await getSession();
    session.user = {id:user.id,name:user.name,email:user.email};
    await session.save();
    return NextResponse.json({ok:true},{status:201});
  } catch (error) {
    console.error("Signup error",error);
    return NextResponse.json({error:"Unable to create your account right now."},{status:500});
  }
}
