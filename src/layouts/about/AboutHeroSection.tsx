import { Container } from "@/components/ui/Container";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { AboutHero } from "@/types";

interface AboutHeroSectionProps {
  hero: AboutHero;
}

/**
 * Figma: Sobre › Section1, `Container` 433:832.
 *
 * Single full-width editorial column — eyebrow, display headline capped at the
 * 880px the design sets, then the lead paragraphs across the full 1320 — closed
 * by a hairline in `neutral/gray`. A watermark spiral bleeds off the right edge.
 *
 * The headline carries no `text-balance`: the Figma line break falls out of the
 * 880px cap on its own, and balancing would move it.
 *
 * ## Motion
 *
 * The hero in two beats, the same shape `PageHeroBlock` gives every other
 * inner page: what names the page, then what explains it. This page does not
 * use that component — its hero closes with a rule the others do not draw — so
 * the groups are written out here.
 *
 * The spiral stays outside it. It is a watermark: animating it would give a
 * decoration the same arrival as the text it sits behind.
 */
export function AboutHeroSection({ hero }: AboutHeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 lg:pt-[88px]">
      <SpiralDecoration
        name="about-right"
        className="top-0 right-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="border-muted flex flex-col items-start gap-5 border-b pb-10 md:pb-section">
          <Reveal preset="heroReveal">
            <p className="text-slab-sub">{hero.eyebrow}</p>

            <h1 className="text-display max-w-[880px]">{hero.title}</h1>
          </Reveal>

          <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
            {hero.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
