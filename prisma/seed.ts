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

  // Seed certifications
  const certifications = await prisma.certification.createMany({
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
  });

  console.log("Certifications created:", certifications);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
