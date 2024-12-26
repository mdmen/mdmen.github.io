import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().url().optional(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./projects" }),
  schema: baseSchema,
});

const demos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./demos" }),
  schema: baseSchema.extend({
    slug: z.string(),
    outerLink: z.string().url().optional(),
  }),
});

export const collections = { projects, demos };
