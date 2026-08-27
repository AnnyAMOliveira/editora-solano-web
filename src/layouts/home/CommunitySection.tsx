import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { HomeContent } from "@/types";

interface CommunitySectionProps {
  content: HomeContent["community"];
}

/**
 * Figma: Home › Section7 (`399:829`).
 *
 * Ink band: the reader-community pitch on the left, the monthly-letter signup
 * card on the right, outlined in `marca-d'agua`.
 *
 * The two halves are the group, so the pitch arrives just before the card it
 * is asking the reader to fill in.
 */
export function CommunitySection({ content }: CommunitySectionProps) {
  return (
    <Section tone="dark" ariaLabel="Comunidade de leitores">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,572px)_minmax(0,585px)] lg:items-center lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />

            <div className="flex flex-col items-start gap-[19px] border border-watermark/20 p-5">
              <p className="text-slab-sub text-muted">
                {content.newsletter.label}
              </p>
              <p className="text-body-lg">{content.newsletter.description}</p>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
