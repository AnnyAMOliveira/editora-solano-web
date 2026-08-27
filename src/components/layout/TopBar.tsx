import { Container } from "@/components/ui/Container";
import { SITE_INFO } from "@/lib/navigation";

/**
 * Figma: the 56px ink strip above the navbar. The right-hand note is dropped
 * below `md` — at that width the two texts would collide.
 */
export function TopBar() {
  return (
    <div className="bg-ink text-bg">
      <Container className="flex h-14 items-center justify-between">
        <p className="text-slab-small">{SITE_INFO.topBarTagline}</p>
        <p className="text-slab-small hidden md:block">{SITE_INFO.topBarNote}</p>
      </Container>
    </div>
  );
}
