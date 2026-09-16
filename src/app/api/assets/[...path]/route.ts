import { promises as fs } from "node:fs";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_FOLDERS = new Set([
  "BOTAS",
  "BOTINES",
  "MOCASINES",
  "SANDALIAS",
  "TACONES",
  "Logos"
]);

function contentType(filePath: string) {
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolved = await params;
  const [folder, ...rest] = resolved.path;

  if (!folder || !ALLOWED_FOLDERS.has(folder) || rest.length === 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const fileName = rest.join("/");
  const base = path.join(process.cwd(), "src", "Img", folder);
  const filePath = path.join(base, fileName);

  if (!filePath.startsWith(base)) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 });
  }

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(data, {
      headers: {
        "content-type": contentType(fileName.toLowerCase()),
        "cache-control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}
