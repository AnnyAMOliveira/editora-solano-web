/**
 * Public surface of the motion layer.
 *
 * The component, the preset names, and the two timings a call site legitimately
 * needs — the pause between a hero's two beats, and the one between a column
 * and the column it follows. The hook, the tween builder and the GSAP
 * registration are internal: a section should never have to know which
 * animation library is underneath, which is also what makes the library
 * replaceable without touching a single page.
 *
 * Deliberately not re-exported: `use-reveal` and `gsap`. This barrel is
 * imported by Server Components, and re-exporting those would put GSAP into the
 * server module graph of every page that only wanted `<Reveal>`. `presets` is
 * safe to re-export because it is pure data and imports nothing.
 */
export { Reveal } from "./Reveal";
export { MOTION_COLUMN_DELAY, MOTION_HERO_DELAY } from "./presets";
export type { MotionPresetName } from "./presets";
