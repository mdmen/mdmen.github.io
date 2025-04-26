import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

interface IconOptions {
  size: number;
  color: string;
  stroke?: number;
}

type OgImageicons = "atom" | "flask";

function getAtomIcon({ size, color, stroke = 2 }: IconOptions) {
  return `<svg xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      stroke="${color}"
      stroke-width="${stroke}"
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/>
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>
    </svg>`;
}

function getFlaskIcon({ size, color, stroke = 2 }: IconOptions) {
  return `<svg xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      stroke="${color}"
      stroke-width="${stroke}"
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/>
    <path d="M6.453 15h11.094"/>
    <path d="M8.5 2h7"/>
  </svg>`;
}

function getSvgIcon(name: OgImageicons, options: IconOptions) {
  switch (name) {
    case "atom":
      return getAtomIcon(options);
    case "flask":
      return getFlaskIcon(options);
  }
}

interface Post {
  title: string;
  logoText?: string;
  logoIcon?: OgImageicons;
  description?: string;
}

function composeOgImageMarkup({ title, description, logoText, logoIcon }: Post) {
  let logoMarkup = "";

  if (logoText) {
    const icon = logoIcon
      ? getSvgIcon(logoIcon, {
          size: 42,
          color: "#222",
        })
      : "";

    logoMarkup = `<div style="
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 28px;
        font-weight: 600;
      ">
        ${icon}
        <span>${logoText}</span>
      </div>`;
  }

  const descriptionMarkup = description
    ? `
      <div style="
        display: flex;
        font-size: 22px;
        padding: 20px 20px 0 20px;
        text-align: center;
        text-wrap: pretty;
        overflow-wrap: break-word;
      ">${description}</div>
  `
    : "";

  return html(`
    <div style="
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      color: #222;
      background-image: linear-gradient(to bottom, #F8FAFC, #D9EAFD);
      padding: 20px;
      box-sizing: border-box;
    ">
      ${logoMarkup}
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 46px;
        text-align: center;
        overflow-wrap: break-word;
        text-wrap: balance;
      ">
        <span>${title}</span>
        ${descriptionMarkup}
      </div>
    </div>
  `);
}

export async function generateOgImage(post: Post) {
  const satoriOptions: SatoriOptions = {
    width: 800,
    height: 400,
    fonts: [
      {
        name: "Inter",
        data: await readFile("./src/assets/fonts/Inter-SemiBold.ttf"),
      },
    ],
  };

  const markup = composeOgImageMarkup(post);

  const svg = await satori(markup, satoriOptions);

  return new Resvg(svg).render().asPng();
}
