import { cn } from "@/lib/utils";
import type { ContactChannel as ContactChannelData } from "@/types";

interface ContactChannelProps {
  channel: ContactChannelData;
  className?: string;
}

/**
 * Figma: Contato › `Timeline Entry` (642 wide) — heading, the address itself
 * and a note, over the same hairline the timeline rows use.
 *
 * It is its own component rather than a variant of `TimelineItem` because the
 * content differs in kind: three lines instead of two, and a value that is a
 * link. The shell measurements are the shared ones (`px-2.5 py-3.5`,
 * `border-muted/20`, 10px gaps), so nothing is re-invented — only the row's
 * own semantics.
 *
 * The heading is ink, not the grey the Figma frame still shows. That grey was
 * legible while the title was Bold 24; once the design system rebound these
 * headings to `Slab/sub` (Regular 20) the colour was the only weight left
 * carrying the hierarchy, and it left the title reading as quieter than the
 * e-mail beneath it. Ink is what every other entry row already uses.
 *
 * `href` is what makes the value clickable; a channel still carrying a
 * placeholder number renders as plain text instead of a dead link.
 */
export function ContactChannel({ channel, className }: ContactChannelProps) {
  return (
    <li
      className={cn(
        "border-muted/20 flex w-full flex-col items-start gap-2.5 border-b px-2.5 py-3.5",
        className,
      )}
    >
      <h3 className="text-slab-sub text-ink text-balance">{channel.title}</h3>

      {channel.href ? (
        <a
          href={channel.href}
          className="text-body hover:text-terra underline-offset-4 transition-colors duration-200 hover:underline"
        >
          {channel.value}
        </a>
      ) : (
        <p className="text-body">{channel.value}</p>
      )}

      <p className="text-body-sm">{channel.note}</p>
    </li>
  );
}
