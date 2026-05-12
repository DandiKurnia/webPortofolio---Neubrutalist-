import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.MINIO_ENDPOINT ?? "http://localhost:9000";
const accessKeyId = process.env.MINIO_ROOT_USER ?? "minioadmin";
const secretAccessKey = process.env.MINIO_ROOT_PASSWORD ?? "minioadmin";
const region = process.env.MINIO_REGION ?? "us-east-1";

export const s3 = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET ?? "projects";

const publicBase = (process.env.MINIO_PUBLIC_URL ?? endpoint).replace(/\/$/, "");

export function publicUrl(key: string) {
  return `${publicBase}/${MINIO_BUCKET}/${key}`;
}

export function keyFromUrl(url: string): string | null {
  const prefix = `${publicBase}/${MINIO_BUCKET}/`;
  if (!url.startsWith(prefix)) return null;
  return url.slice(prefix.length);
}
