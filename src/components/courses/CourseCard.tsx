import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  /** CTA wording — page copy, so it arrives from the content layer. */
  ctaLabel: string;
  className?: string;
}

/**
 * Figma `Card-gender` on Cursos (419 × 305, node 443:1637): hairline border,
 * 20px padding, 20px gaps and the shared drop shadow.
 *
 * It borrows the shell of the Home genre card but not its component: this one
 * carries five slots instead of three, mixes alignments — category, title and
 * description read left, availability and CTA are centred — and holds an
 * interactive element of its own. Only the button is a link; making the whole
 * card one too would nest an anchor inside an anchor.
 *
 * The design centres the stack (`justify-center`) and its three sample cards
 * happen to have descriptions of equal length, so the buttons line up by
 * coincidence. Real copy will not be so tidy, so the closing block is pushed
 * down with `mt-auto`: the CTAs stay on one line across the row whatever the
 * description does.
 */
export function CourseCard({ course, ctaLabel, className }: CourseCardProps) {
  return (
    <article
      className={cn(
        "border-muted/20 shadow-card flex h-full w-full flex-col gap-5 border p-5",
        className,
      )}
    >
      <p className="text-slab-menu text-muted">{course.category}</p>

      {/* No `text-balance` here, unlike the other card titles: the design lets
          these wrap naturally and evening out the lines changes where each
          one breaks. */}
      <h3 className="text-slab-h2">{course.title}</h3>

      <p className="text-body">{course.description}</p>

      <div className="mt-auto flex flex-col items-center gap-5">
        <p className="text-slab-menu text-muted text-center">
          {course.availability}
        </p>

        {/* 126px is the width the design draws. It is a floor rather than a
            fixed width because `Button` never wraps its label: a longer word
            from a CMS would spill out of a hard 126. */}
        <Button href={course.href} className="min-w-[126px]">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
