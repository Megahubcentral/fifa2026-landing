import { horizontalSizeLabel } from "@/lib/ad-sizes";

export type AdPlacement = {
  id: string;
  title: string;
  sizeLabel: string;
  placement: string;
};

export const skyscraperPlacement: AdPlacement = {
  id: "skyscraper-hero",
  title: "Banner Skyscraper",
  sizeLabel: "160×600",
  placement: "Hero Left / Right Rail"
};

export const rectanglePlacements = {
  featuredNews: {
    id: "rectangle-news",
    title: "Banner Rectángulo",
    sizeLabel: "300×250",
    placement: "Noticias destacadas"
  },
  liveStream: {
    id: "rectangle-live",
    title: "Banner Rectángulo",
    sizeLabel: "300×250 · 320×50 móvil",
    placement: "Juego en vivo"
  }
} as const;

const horizontalLabel = horizontalSizeLabel();

export const horizontalPlacements: AdPlacement[] = [
  {
    id: "leaderboard-1",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después del ticker"
  },
  {
    id: "leaderboard-2",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después de noticias destacadas"
  },
  {
    id: "leaderboard-3",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después de partidos y horarios"
  },
  {
    id: "leaderboard-4",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después de tabla de posiciones"
  },
  {
    id: "leaderboard-5",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después de resúmenes de partidos"
  },
  {
    id: "leaderboard-6",
    title: "Banner Horizontal",
    sizeLabel: horizontalLabel,
    placement: "Después de galería inmersiva"
  }
];
