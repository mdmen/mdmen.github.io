export type Icons = "flask" | "github" | "codepen" | "atom" | "email" | "sun" | "moon" | "tags" | "eye";

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

export type PostPreview = ImageMetadata;
