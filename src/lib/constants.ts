import type { CategoryKey } from "@/types/product";

export const BRAND_NAME = "LARCS";
export const BRAND_LOGO_PURPLE = "/api/assets/Logos/LOGO%20LARCS%20MORADO.png";
export const BRAND_LOGO_BW = "/api/assets/Logos/LOGO%20LARCS%20BYN.png";

export const CATEGORY_FOLDER_MAP: Record<CategoryKey, string> = {
  botas: "BOTAS",
  botines: "BOTINES",
  mocasines: "MOCASINES",
  sandalias: "SANDALIAS",
  tacones: "TACONES"
};

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  botas: "Botas",
  botines: "Botines",
  mocasines: "Mocasines",
  sandalias: "Sandalias",
  tacones: "Tacones"
};

export const SHIPPING_COST = 15000;

export const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYwJyBoZWlnaHQ9JzE2MCcgdmlld0JveD0nMCAwIDE2MCAxNjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nI2Y0ZTZlMicvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI2QzYjVhNicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPScxNjAnIGhlaWdodD0nMTYwJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+";
