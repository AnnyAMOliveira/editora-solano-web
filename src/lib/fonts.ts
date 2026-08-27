import { IBM_Plex_Serif, Jost, Playfair_Display } from "next/font/google";

/**
 * The three families defined in the Figma design system.
 *
 * Jost and Playfair Display are variable fonts, so no explicit `weight` is
 * declared — the full axis is available and the weights used by the design
 * (300/400 body, 400/600 display) are addressed through CSS.
 */

// IBM Plex Serif replaced Josefin Slab in the Figma design system: every
// `Slab/*` variable now resolves to it. It is the one family here that is not
// variable on Google Fonts, so the weights the slab utilities address have to
// be listed — 400 (`h2`, `sub`), 500 (`small`) and 600 (`menu`). Nothing asks
// for 700: the design has no Bold slab since the entry titles were rebound to
// `Slab/sub`, and no italic slab exists either.
//
// 500 arrived with the August 2026 button update, which rebound every button
// label to `Slab/small` and moved that variable from Regular to Medium. Without
// it the browser synthesises the weight and the labels render subtly heavier
// and wider than the design.
export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const FONT_VARIABLES = [
  ibmPlexSerif.variable,
  jost.variable,
  playfairDisplay.variable,
].join(" ");
