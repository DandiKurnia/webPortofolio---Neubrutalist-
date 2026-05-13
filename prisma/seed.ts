import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

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

  await prisma.certification.createMany({
    data: [
      {
        title: "Data Privacy Fundamentals",
        company: "Google",
        link: "https://www.coursera.org/account/accomplishments/verify/EXAMPLE1",
        years: "2023",
      },
      {
        title: "AWS Certified Solutions Architect",
        company: "Amazon Web Services",
        link: "https://aws.amazon.com/certification/",
        years: "2024",
      },
      {
        title: "Professional Scrum Master I",
        company: "Scrum.org",
        link: "https://www.scrum.org/certificates/",
        years: "2023",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Certifications seeded");

  await prisma.skill.createMany({
    data: [
      {
        title: "React.js",
        description: "Expert",
        icon: "code",
      },
      {
        title: "Tailwind CSS",
        description: "Expert",
        icon: "css",
      },
      {
        title: "Next.js",
        description: "Advanced",
        icon: "terminal",
      },
      {
        title: "TypeScript",
        description: "Advanced",
        icon: "deployed_code",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Skills seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
