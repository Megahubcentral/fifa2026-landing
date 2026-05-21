/**
 * Tamaños fijos alineados a Google AdSense / Ad Manager e IAB.
 * @see https://support.google.com/adsense/answer/9185043
 * @see https://support.google.com/admanager/answer/1100453
 */
export type AdFormat =
  | "super-leaderboard"
  | "leaderboard"
  | "mobile-banner"
  | "medium-rectangle"
  | "skyscraper";

export type AdSizeSpec = {
  width: number;
  height: number;
  label: string;
  /** Tailwind visibility: cuándo mostrar este formato */
  visibilityClass: string;
};

export const AD_SIZES: Record<AdFormat, AdSizeSpec> = {
  /** Google "Large leaderboard" / Super leaderboard — desktop ancho (≥1024px) */
  "super-leaderboard": {
    width: 970,
    height: 90,
    label: "970×90",
    visibilityClass: "hidden lg:block"
  },
  /** Leaderboard clásico — tablet / desktop medio (768px–1023px) */
  leaderboard: {
    width: 728,
    height: 90,
    label: "728×90",
    visibilityClass: "hidden md:block lg:hidden"
  },
  "mobile-banner": {
    width: 320,
    height: 50,
    label: "320×50",
    visibilityClass: "block md:hidden"
  },
  "medium-rectangle": {
    width: 300,
    height: 250,
    label: "300×250",
    visibilityClass: "block"
  },
  skyscraper: {
    width: 160,
    height: 600,
    label: "160×600",
    visibilityClass: "hidden xl:block"
  }
};

export function horizontalSizeLabel() {
  return `${AD_SIZES["super-leaderboard"].label} (lg+) · ${AD_SIZES.leaderboard.label} (md) · ${AD_SIZES["mobile-banner"].label} (móvil)`;
}
