import { CourseCard } from "@/components/courses/CourseCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeroBlock } from "@/components/ui/PageHeroBlock";
import { Reveal } from "@/motion";
import type { Course, PageHero } from "@/types";

interface CoursesSectionProps {
  hero: PageHero;
  courses: Course[];
  /** Approved sentence for when nothing is on offer. */
  emptyMessage: string;
  ctaLabel: string;
}

/**
 * Figma: Cursos › `Section1` (443:1338) — the editorial opening over the row
 * of offering cards.
 *
 * The row is the 1320px content column split into three 419px cards 31px
 * apart, which is what the grid reproduces at `lg`. Below that it steps to two
 * columns and then to one, the same ladder the Home genre grid uses; at `sm`
 * the third card sits alone on the second row, as it does there.
 *
 * Cards stretch to a common height so the `mt-auto` inside each one can line
 * the CTAs up across the row.
 *
 * The hero cascade comes from `PageHeroBlock`; the row cascades as cards. The
 * enrolment button inside each card is not animated on its own — it arrives
 * with the card it belongs to.
 */
export function CoursesSection({
  hero,
  courses,
  emptyMessage,
  ctaLabel,
}: CoursesSectionProps) {
  return (
    <section aria-label="Cursos e materiais" className="pt-16 pb-10 md:pb-section lg:pt-[88px]">
      <Container>
        <PageHeroBlock hero={hero} />

        {/* Figma leaves 93px between the lead paragraph and the card row; 96px
            is the nearest step on the scale. Mobile halves it. */}
        {courses.length > 0 ? (
          <Reveal
            as="ul"
            preset="staggerCards"
            className="mt-12 grid grid-cols-1 items-stretch gap-[31px] sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
          >
            {courses.map((course) => (
              <li key={course.id} className="flex">
                <CourseCard course={course} ctaLabel={ctaLabel} />
              </li>
            ))}
          </Reveal>
        ) : (
          <EmptyState message={emptyMessage} className="mt-12 lg:mt-24" />
        )}
      </Container>
    </section>
  );
}
