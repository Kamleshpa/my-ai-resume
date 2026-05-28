import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePdf } from "@/lib/resume-pdf";
import { applyVariant, getVariantBySlug } from "@/lib/variants";

export const runtime = "nodejs";

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const variant = getVariantBySlug(slug);
  if (!variant) {
    return new Response("Variant not found", { status: 404 });
  }

  const data = applyVariant(variant);
  const buffer = await renderToBuffer(<ResumePdf data={data} />);
  const filename = `${slugify(data.personal.name)}-${slug}-resume.pdf`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
