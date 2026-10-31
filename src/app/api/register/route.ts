import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import { DEFAULT_CATEGORIES, registerSchema } from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}));
    const parsed = registerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed." },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          passwordHash,
        },
        select: { id: true, name: true, email: true },
      });

      await tx.category.createMany({
        data: DEFAULT_CATEGORIES.map((category) => ({
          userId: createdUser.id,
          categoryName: category.categoryName,
          description: category.description,
          icon: category.icon,
          color: category.color,
          isCustom: category.isCustom,
          isArchived: false,
        })),
      });

      return createdUser;
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "Unable to create account right now." }, { status: 500 });
  }
}
