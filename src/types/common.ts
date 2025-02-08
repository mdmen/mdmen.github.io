export type Icons =
  | "flask"
  | "github"
  | "codepen"
  | "atom"
  | "email"
  | "sun"
  | "moon";

export interface SocialLink {
  name: string;
  link: string;
  icon: Icons;
}
