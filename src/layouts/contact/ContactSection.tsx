import { ContactChannel } from "@/components/contact/ContactChannel";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiralDecoration } from "@/components/ui/SpiralDecoration";
import type { ContactContent } from "@/types";

interface ContactSectionProps {
  content: ContactContent;
}

/**
 * Figma: Contato › Section1 (`440:1007`).
 *
 * A 2 × 2 grid — hero and the office card on the first row, the channel list
 * and the message form on the second. Source order is hero, office, channels,
 * form, which is both the reading order of the design and the required mobile
 * order, so row auto-flow places everything without explicit coordinates.
 *
 * The channel list starts at the standard 60px gutter; Figma has it at 62,
 * which is an accidental 2px nudge.
 */
export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section
      aria-label="Contato"
      className="relative overflow-hidden pt-16 pb-10 md:pb-section lg:pt-[88px]"
    >
      <SpiralDecoration
        name="contact-left"
        className="bottom-0 left-0 hidden lg:block"
      />

      <Container className="relative">
        <div className="grid items-start gap-y-6 lg:grid-cols-[minmax(0,642px)_minmax(0,641px)] lg:gap-x-[35px]">
          <PageHeroBlock hero={content.hero} titleClassName="max-w-[639px]" />

          <Panel tone="ink" className="flex flex-col items-start gap-2.5">
            <p className="text-slab-menu text-bg">{content.office.label}</p>
            <p className="text-slab-sub">{content.office.address}</p>
            <p className="text-body">{content.office.details}</p>
            <p className="text-body-sm">{content.office.legal}</p>
          </Panel>

          <ul className="flex flex-col lg:mt-6">
            {content.channels.map((channel) => (
              <ContactChannel key={channel.id} channel={channel} />
            ))}
          </ul>

          <Panel>
            <div className="flex flex-col gap-8">
              <SectionHeading title={content.formTitle} />
              <ContactForm />
            </div>
          </Panel>
        </div>
      </Container>
    </section>
  );
}
