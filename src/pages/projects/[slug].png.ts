import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@/utils/og-image";

export const getStaticPaths = async () => {
  const entries = await getCollection("projects");

  return entries
    .filter(({ data }) => !data.ogImage)
    .map((entry) => ({
      params: { slug: entry.id },
      props: {
        title: entry.data.title,
        description: entry.data.description,
      },
    }));
};

export async function GET({ props }: APIContext) {
  const { title, description } = props;

  const image = await generateOgImage({
    title,
    description,
    category: "Projects",
    icon: "atom",
  });

  return new Response(image);
}
