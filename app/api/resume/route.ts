import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { s3, MINIO_BUCKET, keyFromUrl } from "@/lib/minio";

// GET current resume (singleton: latest row)
export async function GET() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// POST set active resume (replaces any existing one)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { url, filename, size } = body;

    if (!url || !filename || typeof size !== "number") {
      return NextResponse.json(
        { error: "url, filename, and size are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.resume.findMany();

    await prisma.resume.create({
      data: { url, filename, sizeBytes: size },
    });

    for (const old of existing) {
      const key = keyFromUrl(old.url);
      if (key) {
        try {
          await s3.send(
            new DeleteObjectCommand({ Bucket: MINIO_BUCKET, Key: key })
          );
        } catch (err) {
          console.error("Failed to delete old resume object", key, err);
        }
      }
      await prisma.resume.delete({ where: { id: old.id } });
    }

    const current = await prisma.resume.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(current, { status: 201 });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}

// DELETE current resume
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const all = await prisma.resume.findMany();
    for (const r of all) {
      const key = keyFromUrl(r.url);
      if (key) {
        try {
          await s3.send(
            new DeleteObjectCommand({ Bucket: MINIO_BUCKET, Key: key })
          );
        } catch (err) {
          console.error("Failed to delete resume object", key, err);
        }
      }
      await prisma.resume.delete({ where: { id: r.id } });
    }

    return NextResponse.json({ message: "Resume removed" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
