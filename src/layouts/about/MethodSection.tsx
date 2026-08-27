import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { Reveal } from "@/motion";
import type { AboutMethod } from "@/types";

interface MethodSectionProps {
  method: AboutMethod;
}

/**
 * Figma: Sobre › `Container` 433:838 + `Timeline Container` 433:842.
 *
 * Editorial column on the left, the five principles on the right, over a
 * watermark spiral bleeding off the left edge.
 *
 * The grid is deliberately NOT justified to the right gutter the way the Home's
 * "Como Publicar" is: the design places the 536px timeline at x=702 inside the
 * 1320 content column, leaving ~142px of air on the right. The fixed track
 * maxima reproduce that at 1440 and shrink proportionally below it.
 *
 * ## Motion
 *
 * The heading arrives as one block; the principles cascade. They are the same
 * `TimelineItem` the Home's "Como Publicar" uses and they get the same
 * treatment there — numbered steps describing a sequence, where reading them in
 * order is the point.
 *
 * `<Reveal as="ol">` replaces the list element rather than wrapping it: a
 * `<div>` between an `<ol>` and its `<li>`s is invalid markup and costs the
 * list its semantics.
 */
export function MethodSection({ method }: MethodSectionProps) {
  return (
    <Section ariaLabel="O Método Solano" className="relative overflow-hidden">
      <SpiralDecoration
        name="about-left"
        className="top-[150px] left-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,566px)_minmax(0,536px)] lg:gap-x-[76px]">
          <Reveal>
            <SectionHeading
              title={method.title}
              description={method.description}
            />
          </Reveal>

          <Reveal as="ol" preset="staggerCards" className="flex flex-col">
            {method.principles.map((principle) => (
              <TimelineItem key={principle.id} entry={principle} />
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
