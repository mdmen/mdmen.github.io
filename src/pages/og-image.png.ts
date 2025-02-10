import { generateOgImage } from "@/utils/og-image";

export async function GET() {
  const image = await generateOgImage({
    title: "Dmitry's personal website",
  });

  return new Response(image);
}
