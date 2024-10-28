// prisma/seed/users.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface UserData {
  email: string;
  password: string;
  name: string;
  roleName: string;
}

export async function seedUsers() {
  const usersData: UserData[] = [
    {
      email: "admin@admin.com",
      password: "password",
      name: "Admin",
      roleName: "admin",
    },
    {
      email: "user@user.com",
      password: "password",
      name: "User",
      roleName: "user",
    },
  ];

  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        verifiedAt: new Date(),
        roles: {
          connect: { name: user.roleName },
        },
      },
      create: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        verifiedAt: new Date(),
        roles: {
          connect: { name: user.roleName },
        },
      },
    });
    console.log(`User '${user.email}' telah dibuat atau diperbarui.`);
  }
}
