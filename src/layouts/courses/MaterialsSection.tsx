import { MaterialsForm } from "@/components/courses/MaterialsForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { Reveal } from "@/motion";
import type { CourseMaterial, SectionIntro } from "@/types";

interface MaterialsSectionProps {
  intro: SectionIntro;
  materials: CourseMaterial[];
}

/**
 * Figma: Cursos › `Section 5` (445:1666) — the tinted band holding the sign-up
 * form beside the list of free downloads.
 *
 * Ground, spiral and placement are the ones the Home "Como Publicar" band
 * already established: `watermark/20` behind the section and the same
 * `publishing` crop bottom-left, which is the very decoration Figma reuses
 * here (both render at 336 × 302).
 *
 * Two 642px columns, 36px apart. The design drops the right column 60px below
 * the left; that offset is not reproduced, following the rule the earlier
 * pages set — fixed frame offsets and heights give way to padding and flow, so
 * real content cannot break the composition. The columns align at the top.
 *
 * The materials are not links. The design draws no affordance on them and the
 * copy beside the form says they arrive by e-mail, so they render as the
 * static timeline rows they are.
 *
 * ## The list hides when there is nothing in it
 *
 * The only place in the project where a list vanishes instead of speaking,
 * and the exception is deliberate (approved 27/08/2026). This band is an
 * exchange — the form asks for an e-mail, the list is what arrives in return —
 * so an empty list is not a state to narrate but a promise with nothing behind
 * it. A sentence saying "no materials yet" beside a form still collecting
 * addresses would make that promise explicit rather than withdraw it.
 *
 * **The form stays.** Hiding it too is a separate editorial decision that has
 * not been made: the newsletter it signs the reader up for exists whether or
 * not a download does. So the band keeps its heading, its lead line and its
 * form, and loses only the column that has nothing to show.
 *
 * The grid is `lg:grid-cols-2` and the missing column simply leaves its track
 * empty rather than letting the form stretch across the band — the form keeps
 * the width the design gave it.
 *
 * ## Motion
 *
 * The heading enters; the materials fade in.
 *
 * `fadeIn` and not `staggerCards`, which is what every other list on the site
 * gets. These rows are not cards to browse — they are the contents of what the
 * form promises, read as one inventory. A cascade would make five filenames
 * arrive like five products. The brief asks for a "entrada suave" here and
 * distinguishes it from the lists, and this is that distinction.
 *
 * The form is left alone. It is the point of the band and it is a control:
 * animating it would mean the reader watches a field arrive before they can
 * type in it.
 */
export function MaterialsSection({ intro, materials }: MaterialsSectionProps) {
  return (
    <Section
      ariaLabel="Materiais gratuitos"
      className="bg-watermark/20 relative overflow-hidden"
    >
      <SpiralDecoration
        name="publishing"
        className="bottom-0 left-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid gap-x-9 gap-y-12 lg:grid-cols-2">
          {/* 72px between the heading and the first label — Figma stacks a
              50px bottom padding on the heading block with a 20px gap. */}
          <div className="flex flex-col gap-10 lg:gap-18">
            <Reveal>
              <SectionHeading
                eyebrow={intro.eyebrow}
                eyebrowClassName="text-slab-sub text-ink"
                titleVariant="display"
                title={intro.title}
                description={intro.description}
              />
            </Reveal>

            <MaterialsForm />
          </div>

          {materials.length > 0 ? (
            <Reveal as="ul" preset="fadeIn" className="flex flex-col">
              {materials.map((material) => (
                <TimelineItem key={material.id} entry={material} />
              ))}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
