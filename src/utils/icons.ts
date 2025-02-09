interface IconOptions {
  size: number;
  color: string;
  stroke?: number;
}

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

export type OgImageicons = "atom" | "flask";

export function getSvgIcon(name: OgImageicons, options: IconOptions) {
  switch (name) {
    case "atom":
      return getAtomIcon(options);
    case "flask":
      return getFlaskIcon(options);
  }
}
