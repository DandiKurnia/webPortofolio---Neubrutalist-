import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const hashedPassword = await hash("dandi3105", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admindandi@admin.com" },
    update: {},
    create: {
      email: "admindandi@admin.com",
      password: hashedPassword,
      name: "Admin Dandi",
    },
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
