import type { Icons } from "@/types/common";

const author = "Dmitry Menovshchikov";

export const websiteConfig = {
  author,
  titleAppendix: ` 🛰️ ${author}`,
  defaultTitle: "Personal website",
  defaultDescription: "Dmitry's personal website, projects and experiments",
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

interface SocialLink {
  name: string;
  link: string;
  icon: Icons;
}

export const socialLinks: SocialLink[] = [
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
