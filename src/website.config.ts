import type { SocialLink } from "@/types/common";

const author = "Dmitry Menovshchikov";

export const websiteConfig = {
  author,
  titleSuffix: ` 🚀 ${author}`,
  defaultDescription: `Dmitry's personal website, projects and experiments`,
};

export const navigationLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Projects",
    path: "/projects/",
  },
  {
    name: "Experiments",
    path: "/experiments/",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    link: "mailto:test@email.com",
    icon: "email",
  },
  {
    name: "Codepen",
    link: "https://codepen.io/mdmen",
    icon: "codepen",
  },
  {
    name: "Github",
    link: "https://github.com/mdmen",
    icon: "github",
  },
];
