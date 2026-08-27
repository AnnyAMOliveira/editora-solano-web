import { PostCard } from "@/components/blog/PostCard";
import { AgendaEntry } from "@/components/events/AgendaEntry";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/motion";
import type { AgendaEvent, HomeContent, Post } from "@/types";

interface AgendaBlogSectionProps {
  agenda: HomeContent["agenda"];
  blog: HomeContent["blog"];
  /** A slice of the same events `/eventos` lists — see `lib/data/events.ts`. */
  events: AgendaEvent[];
  posts: Post[];
}

/**
 * Figma: Home › Section 6 (`398:826`).
 *
 * Two independent columns — the 527px agenda and the 680px blog list — that
 * stack below `lg`.
 *
 * The year beside the agenda title comes from the content block rather than
 * from the clock: the Home is prerendered, so a computed year freezes at build
 * time. Same arrangement as the podcast and press lists.
 *
 * ## Motion
 *
 * Each column reveals on its own trigger, so at `lg` — where they sit side by
 * side — they arrive together, and below it, where they are stacked, the
 * second waits until the reader reaches it. Both are the doing of one
 * ScrollTrigger per group; neither column knows about the other.
 *
 * The empty states are outside the groups. A single line of editorial copy has
 * nothing to cascade, and animating an apology for missing content draws the
 * eye to it.
 */
export function AgendaBlogSection({
  agenda,
  blog,
  events,
  posts,
}: AgendaBlogSectionProps) {
  return (
    <Section ariaLabel="Agenda e blog">
      <Container>
        <div className="grid gap-x-[112px] gap-y-16 lg:grid-cols-[minmax(0,527px)_minmax(0,680px)] lg:justify-between">
          <div>
            <Reveal>
              <SectionHeading
                title={agenda.title}
                action={<p className="text-slab-menu text-muted">{agenda.year}</p>}
              />
            </Reveal>
            <div className="mt-12">
              {events.length > 0 ? (
                <Reveal preset="staggerCards">
                  {events.map((event) => (
                    <AgendaEntry key={event.id} event={event} />
                  ))}
                </Reveal>
              ) : (
                <EmptyState message={agenda.emptyMessage} />
              )}
            </div>
          </div>

          <div>
            <Reveal>
              <SectionHeading
                title={blog.title}
                action={
                  <Button href={blog.cta.href} variant="outline" hasIcon>
                    {blog.cta.label}
                  </Button>
                }
              />
            </Reveal>
            <div className="mt-12">
              {posts.length > 0 ? (
                <Reveal preset="staggerCards">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </Reveal>
              ) : (
                <EmptyState message={blog.emptyMessage} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
