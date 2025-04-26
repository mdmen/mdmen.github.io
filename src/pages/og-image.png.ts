import { generateOgImage } from "@/utils/open-graph";

export async function GET() {
  const image = await generateOgImage({
    title: "Dmitry's personal website",
    logoIcon: "atom",
    logoText: "mdmen.github.io",
  });

  return new Response(image);
}
