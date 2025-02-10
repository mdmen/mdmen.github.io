import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { type OgImageicons, getSvgIcon } from "./icons";

interface Post {
  title: string;
  logoText?: string;
  description?: string;
  icon?: OgImageicons;
}

function composeOgImageMarkup({ title, description, logoText, icon }: Post) {
  const logoMarkup = logoText
    ? `<div style="
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 28px;
        font-weight: 600;
      ">
      ${
        icon
          ? getSvgIcon(icon, {
              size: 42,
              color: "#222",
            })
          : ""
      }
        <span>${logoText}</span>
      </div>`
    : "";

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

  // @ts-ignore
  const svg = await satori(markup, satoriOptions);

  return new Resvg(svg).render().asPng();
}
