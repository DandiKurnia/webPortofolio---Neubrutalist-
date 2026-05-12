import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET single skill
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

// PUT update skill
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, icon } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        title,
        description,
        icon: icon || "code",
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

// DELETE skill
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
