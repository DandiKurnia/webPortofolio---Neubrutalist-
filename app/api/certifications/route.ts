import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all certifications
export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

// POST create new certification
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, company, link, years } = body;

    if (!title || !company || !years) {
      return NextResponse.json(
        { error: "Title, company, and years are required" },
        { status: 400 }
      );
    }

    const certification = await prisma.certification.create({
      data: {
        title,
        company,
        link: link || null,
        years,
      },
    });

    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    console.error("Error creating certification:", error);
    return NextResponse.json(
      { error: "Failed to create certification" },
      { status: 500 }
    );
  }
}
