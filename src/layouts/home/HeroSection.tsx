import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { SITE_INFO } from "@/lib/navigation";
import { MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { HomeContent } from "@/types";

interface HeroSectionProps {
  content: HomeContent["hero"];
}

/**
 * Figma: Home › Section1 (`364:906`).
 *
 * Editorial column on the left (subtitle, display headline, description, two
 * calls to action) with the "O MÉTODO SOLANO" block on the right, set below a
 * hairline in `overlay/dark/60`. Watermark spirals bleed off both edges.
 */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-[88px]">
      <SpiralDecoration
        name="hero-left"
        className="top-0 left-0 hidden lg:block"
      />
      <SpiralDecoration
        name="hero-right"
        className="top-[170px] right-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,680px)_minmax(0,565px)] lg:justify-between">
          <div className="flex flex-col items-start gap-5">
            {/* Two beats rather than four arrivals: what names the page, then
                what explains it. `heroReveal` carries a stagger of zero, which
                is the point — the eyebrow and the headline belong to one
                another, and separating them by even a fraction turns a
                composition into a queue. Section headings elsewhere move as
                one block; see the note in `GenresSection`. */}
            <Reveal preset="heroReveal">
              <p className="text-slab-sub">{`${SITE_INFO.name} — ${content.eyebrowLocation}`}</p>

              <h1 className="text-display text-balance">
                {content.title.before}
                <Emphasis className="font-semibold">
                  {content.title.emphasis}
                </Emphasis>
              </h1>
            </Reveal>

            <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
              <p className="text-body-lg max-w-[680px]">{content.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-[27px]">
                <Button href={content.primaryCta.href}>
                  {content.primaryCta.label}
                </Button>
                <Button href={content.secondaryCta.href} variant="terra">
                  {content.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col items-start gap-5 border-t border-ink/60 py-[15px] lg:self-end">
            {/* Held back so the second column reads as following the first
                rather than racing it — the same pause the two beats of the
                left column use. At `lg` they sit side by side; below it the
                delay is inaudible because the block is already lower. */}
            <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
              <p className="text-slab-menu text-ink/60">{content.method.label}</p>
              <p className="text-body">{content.method.description}</p>
              <Button href={content.method.cta.href} variant="outline" hasIcon>
                {content.method.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
