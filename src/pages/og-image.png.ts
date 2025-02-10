import { generateOgImage } from "@/utils/og-image";

export async function GET() {
  const image = await generateOgImage({
    title: "Dmitry's personal website",
    icon: "atom",
    logoText: "mdmen.github.io",
  });

  return new Response(image);
}
