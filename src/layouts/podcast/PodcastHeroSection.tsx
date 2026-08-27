import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_HERO_DELAY, Reveal } from "@/motion";
import type { Episode, PodcastHero } from "@/types";

interface PodcastHeroSectionProps {
  hero: PodcastHero;
  /**
   * The most recently published episode, from `getFeaturedEpisode()`.
   * `undefined` when none is published — then the hero shows the programme.
   */
  featuredEpisode?: Episode;
}

/**
 * Figma: Podcast › `Section2` (498:1702) — the show's presentation on the ink
 * band, beside its artwork.
 *
 * The text column is inset a further 60px inside the page gutter, which is
 * what puts it at the 120px the design draws; this is the one place on the
 * site that does not start at the standard 60. The artwork keeps its 587px and
 * its 587 / 539 crop.
 *
 * Figma stops the artwork 94px short of the content column's right edge. That
 * gap is spent between the two columns instead, so the artwork closes on the
 * same right edge as the header, the footer and every other section — the
 * composition reads the same and the page keeps one alignment.
 *
 * Below `lg` the two stack, text first: the words introduce the show and the
 * cover illustrates it.
 *
 * ## What the band shows
 *
 * **The most recently published episode, whenever there is one.** Editorial
 * decided the highlight is never picked by hand: publishing an episode is the
 * whole operation, and this band follows from the data. Title, synopsis,
 * artwork and destination all come from `featuredEpisode`.
 *
 * `getFeaturedEpisode()` in `lib/data/podcast.ts` owns the choice. This
 * component never sorts, compares dates or reads the episode list — it
 * receives one episode or none, which is what lets a CMS answer the same
 * question natively without any change here.
 *
 * **With no published episode the programme's own presentation renders**, from
 * `hero`, exactly as before. That is the empty state: the band keeps its
 * structure and the show introduces itself, rather than the section vanishing
 * or a placeholder episode being invented. It needs no new copy, because the
 * programme's presentation is already approved text.
 *
 * ## The eyebrow keeps the programme's name
 *
 * When an episode takes the title slot, "Antes do Livro" would otherwise
 * disappear from its own page — a visitor arriving at `/podcast` could read
 * the whole band without learning what the show is called. So the eyebrow
 * carries the programme name alongside the episode number in that state.
 *
 * The Figma frame draws only the fallback, so this composition is not in the
 * design and should be confirmed. The alternative — dropping the show's name
 * — is worse, so it is not treated as the safer default.
 *
 * ## Motion
 *
 * The text column arrives in two beats — the programme name with the title,
 * then the synopsis with the link out. The
 * artwork is grouped as `fadeIn` and, sitting above the fold, that resolves to
 * nothing at all — an opacity-only preset has nothing left once the rule that
 * visible content is never hidden is applied. The group is written anyway, so
 * the cover behaves like every other image on the site the day this band moves
 * or the viewport is short enough to push it under.
 */
export function PodcastHeroSection({
  hero,
  featuredEpisode,
}: PodcastHeroSectionProps) {
  // The episode wins every field it can supply. `cover` is the one it may
  // legitimately lack: an episode becomes the highlight by its date, and
  // requiring an art file would mean publishing could not happen without one.
  const eyebrow = featuredEpisode
    ? `${hero.title} · #${featuredEpisode.number}`
    : hero.eyebrow;
  const title = featuredEpisode?.title ?? hero.title;
  const description = featuredEpisode?.description ?? hero.description;
  const cover = featuredEpisode?.cover ?? hero.cover;
  const ctaHref = featuredEpisode?.href ?? hero.cta.href;

  return (
    <Section tone="dark" ariaLabel={hero.title}>
      <Container>
        <div className="grid items-center gap-y-12 lg:grid-cols-[minmax(0,579px)_minmax(0,587px)] lg:justify-between lg:pl-[60px]">
          <div className="flex flex-col items-start gap-5">
            <Reveal preset="heroReveal">
              <p className="text-slab-sub">{eyebrow}</p>

              <h1 className="text-display text-balance">{title}</h1>
            </Reveal>

            <Reveal preset="heroReveal" delay={MOTION_HERO_DELAY}>
              <p className="text-body-lg">{description}</p>

              {/* The label is approved copy and stays put; only where it leads
                changes. "Ouça Agora no Spotify" is true of an episode and of
                the programme alike. */}
              <Button href={ctaHref} variant="outline" className="mt-4">
                {hero.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal preset="fadeIn">
            <div className="relative aspect-[587/539] w-full overflow-hidden">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 587px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
