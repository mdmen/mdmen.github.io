import { glob } from "astro/loaders";
import { defineCollection, type SchemaContext, z } from "astro:content";

const buildSchema =
  (extraSchema: z.ZodRawShape = {}) =>
  ({ image }: SchemaContext) =>
    z
      .object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        publishDate: z.string().date().optional(),
        updateDate: z.string().date().optional(),
        ogImage: image()
          .refine((img) => img.width >= 600 && img.height >= 315, {
            message: "Open Graph image must be at least 600x315 pixels",
          })
          .optional(),
      })
      .extend(extraSchema);

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: ".src/content/projects" }),
  schema: buildSchema({
    demoLink: z.string().url().optional(),
    repoLink: z.string().url().optional(),
  }),
});

const experiments = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/experiments",
  }),
  schema: buildSchema({
    codepen: z.string().optional(),
  }),
});

export const collections = { projects, experiments };
