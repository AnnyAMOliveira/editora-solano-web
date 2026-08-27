import type { Metadata } from "next";

import { CoursesSection, MaterialsSection } from "@/layouts/courses";
import { getCoursesContent } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "Cursos e materiais",
  description:
    "O mesmo processo que aplicamos nas obras da casa, aberto a quem está escrevendo o primeiro livro.",
};

/**
 * Cursos e materiais — Figma frame `443:1335`.
 *
 * A directory, not a catalogue: it names the offerings and forwards the reader
 * to whatever destination the data carries, so there is no `/cursos/[slug]`.
 *
 * This page composes and nothing else. It asks `lib/data/courses.ts` for the
 * content and hands it down — it does not know whether the answer came from a
 * file, a CMS or an API. The `await` is what keeps it that way: the day the
 * source becomes a network call, nothing here changes.
 *
 * The form's payload is separate again: `MaterialsForm` holds it as a
 * `MaterialsRequestDraft`, ready for whatever endpoint receives it.
 */
export default async function CoursesPage() {
  const content = await getCoursesContent();

  return (
    <>
      <CoursesSection
        hero={content.hero}
        courses={content.courses}
        emptyMessage={content.coursesEmptyMessage}
        ctaLabel={content.courseCtaLabel}
      />

      <MaterialsSection
        intro={content.materialsIntro}
        materials={content.materials}
      />
    </>
  );
}
