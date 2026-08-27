import { SubmissionForm } from "@/components/publish/SubmissionForm";
import { Container } from "@/components/ui/Container";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { PublishContent, SelectOption } from "@/types";

interface PublishSectionProps {
  content: PublishContent;
  /**
   * Kept apart from `content` on purpose: a genre taxonomy is not page copy,
   * and the next thing to read it is likelier to be a catalogue filter than
   * this form.
   */
  genreOptions: SelectOption[];
}

/**
 * Figma: Publique com a gente › Section1 (`433:831`).
 *
 * One grid, not two stacked sections: the form panel spans the full height of
 * the left column, sitting beside both the hero and the conditions list. The
 * columns are the 642 / 641 the design sets, 37px apart, and the panel reaches
 * the right gutter (60 + 642 + 37 + 641 = 1380).
 *
 * Placement is explicit rather than left to auto-flow because the source order
 * is the mobile order — hero, conditions, form — while on desktop the form has
 * to jump to the second column and span both rows.
 *
 * The watermark spiral is the same crop the Sobre page uses: Figma gives both
 * frames identical decoration coordinates, so the asset is reused as-is.
 */
export function PublishSection({ content, genreOptions }: PublishSectionProps) {
  return (
    <section
      aria-label="Publique com a gente"
      className="relative overflow-hidden pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <SpiralDecoration
        name="about-left"
        className="bottom-0 left-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,642px)_minmax(0,641px)] lg:gap-x-[37px]">
          <PageHeroBlock
            hero={content.hero}
            titleClassName="max-w-[639px]"
            className="lg:col-start-1 lg:row-start-1"
          />

          <ol className="flex flex-col lg:col-start-1 lg:row-start-2">
            {content.conditions.map((condition) => (
              <TimelineItem key={condition.id} entry={condition} />
            ))}
          </ol>

          <Panel className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-[19px]">
            <div className="flex flex-col gap-8">
              <SectionHeading title={content.formTitle} />
              <SubmissionForm genreOptions={genreOptions} />
            </div>
          </Panel>
        </div>
      </Container>
    </section>
  );
}
