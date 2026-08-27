import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The project's only entry point to GSAP.
 *
 * Nothing else imports `gsap` directly. One module means one place where the
 * plugin list is registered, one place to look when a plugin is added, and no
 * chance of two files disagreeing about which plugins exist.
 *
 * ## Why the guard
 *
 * A `"use client"` module is not a browser-only module: Next prerenders client
 * components on the server, so this file is evaluated there too.
 * `registerPlugin` reaches for `document`, so it runs only where there is one.
 * The tweens themselves never run on the server — they live in effects.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
