import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePdf } from "@/lib/resume-pdf";
import { resumeData } from "@/lib/resume-data";

export const runtime = "nodejs";

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const buffer = await renderToBuffer(createElement(ResumePdf));
  const filename = `${slugify(resumeData.personal.name)}-resume.pdf`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
