import { cn } from "@/lib/utils";

interface PlayIconProps {
  className?: string;
}

/**
 * The play triangle inside the Figma `Frame 17` control (500:1824),
 * transcribed from the exported asset with the fill switched to
 * `currentColor` so it inherits the control's text color.
 *
 * The circle around it is not drawn here: it is a token pair the design system
 * already has (`mata` ground, `areia` mark), so the consumer paints it with
 * classes instead of shipping an image.
 *
 * The shape is deliberately not a perfect isosceles triangle — the design's
 * polygon leans slightly, and that is reproduced rather than tidied up.
 *
 * The viewBox is the control's full 54px square rather than a crop of the
 * triangle, which keeps the optical offset the design gives it: a play mark
 * centred on its bounding box reads as sitting too far left.
 */
export function PlayIcon({ className }: PlayIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      <path
        d="M38.0758 26.9997L21.6424 36.6403L21.5101 17.5882L38.0758 26.9997Z"
        fill="currentColor"
      />
    </svg>
  );
}
