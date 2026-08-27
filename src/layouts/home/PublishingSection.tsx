import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { Reveal } from "@/motion";
import type { HomeContent, PublishingStep } from "@/types";

interface PublishingSectionProps {
  content: HomeContent["publishing"];
  steps: PublishingStep[];
}

/**
 * Figma: Home › Section 5 (`392:672`).
 *
 * Editorial column on the left with two calls to action, the five-step process
 * timeline on the right, and a watermark spiral in the lower left corner.
 *
 * The eyebrow here is Slab/h2 in grey — larger than the eyebrow of Section 4 —
 * which is why `SectionHeading` takes an eyebrow class override.
 *
 * This is the one section with a tinted ground: the Figma frame carries a
 * `marca-d'agua` fill (#d4d4d8 at 20%) across its full width.
 *
 * ## Motion
 *
 * The steps are the one list on the site where the cascade is the content:
 * they are numbered, they describe a sequence, and reading them in order is
 * the point. `<Reveal as="ol">` replaces the list element rather than wrapping
 * it — a `<div>` between an `<ol>` and its `<li>`s is invalid markup and would
 * cost the list its semantics.
 */
export function PublishingSection({ content, steps }: PublishingSectionProps) {
  return (
    <Section
      ariaLabel="Como Publicar"
      className="bg-watermark/20 relative overflow-hidden"
    >
      <SpiralDecoration
        name="publishing"
        className="bottom-0 left-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,645px)_minmax(0,536px)] lg:justify-between">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <SectionHeading
                eyebrow={content.eyebrow}
                eyebrowClassName="text-slab-h2 text-muted"
                titleVariant="display"
                title={
                  <>
                    {content.title.before}
                    <Emphasis>{content.title.emphasis}</Emphasis>
                    {content.title.after}
                  </>
                }
                description={content.description}
              />

              <div className="mt-4 flex flex-wrap items-center gap-[19px]">
                <Button href={content.primaryCta.href} variant="terra">
                  {content.primaryCta.label}
                </Button>
                <Button href={content.secondaryCta.href}>
                  {content.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal as="ol" preset="staggerCards" className="flex flex-col">
            {steps.map((step) => (
              <TimelineItem key={step.id} entry={step} />
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
