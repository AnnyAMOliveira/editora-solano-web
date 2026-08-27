import type { PostContentBlock } from "@/types";

interface PostBodyProps {
  blocks: PostContentBlock[];
}

/**
 * The article column of `/blog/[slug]` — Figma `Content Section` (547:3983).
 *
 * Renders `Post.content` block by block. The `switch` is exhaustive by
 * construction: `PostContentBlock` is a discriminated union, so adding a kind
 * without handling it here is a type error rather than a silently missing
 * paragraph.
 *
 * The four kinds are the four the frame draws and no more. A block type that
 * the design does not show would be a feature invented in a renderer.
 */
export function PostBody({ blocks }: PostBodyProps) {
  return (
    <div className="flex flex-col gap-10">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2 key={index} className="text-slab-h2 text-balance">
                {block.text}
              </h2>
            );

          case "quote":
            // Figma sets the quote in the display italic and hangs a large
            // opening mark to its left. The mark is typography rather than
            // content, so it is drawn here and never stored on the block.
            return (
              <blockquote
                key={index}
                className="relative py-2 pl-14 md:pl-[77px]"
              >
                <span
                  aria-hidden="true"
                  className="text-display text-mata absolute top-1 left-0 leading-none"
                >
                  &ldquo;
                </span>
                <p className="text-h2 text-mata italic">{block.text}</p>
              </blockquote>
            );

          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-body-lg marker:text-muted list-disc"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "paragraph":
            return (
              <p key={index} className="text-body-lg">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
